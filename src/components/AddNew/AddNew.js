import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  TextField,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide
} from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { Close } from '@material-ui/icons';
import { itemsRef, storage } from '../../firebase';
import RecipesList from '../AllRecipes/RecipesList';
import Header from '../Header';
import ButtonAddNew from '../AddNew/ButtonAddNew';
import ImagesList from '../ImagesOnly/ImagesList';
import { Switch, Route, Link } from 'react-router-dom';
import RecipeDetail from '../AllRecipes/RecipeDetail';
import Home from '../home/Home';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  textfield: {
    width: '80%'
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [fileImage, setFileImage] = useState({
    file: '',
    imagePreviewUrl: ''
  });
  const [recipe, setRecipe] = useState({
    title: '',
    ingredients: '',
    amount: '',
    procedure: ''
  });
  const [items, setItems] = useState([]);
  const [recipeKeys, setRecipeKeys] = useState([]);
  const imagesData = items.filter(item => (item.image ? true : false));

  useEffect(() => {
    // code to run on component mount
    itemsRef.ref('items').on('value', snapshot => {
      const recipes = snapshot.val();
      setRecipeKeys(snapshot.val());
      const newItems = [];

      for (let oneRecipe in recipes) {
        const { title, ingredients, amount, procedure, imageUrl, id } = recipes[
          oneRecipe
        ];
        newItems.push({
          title,
          ingredients,
          amount,
          procedure,
          id,
          image: imageUrl
        });
      }
      const recipesWithId = newItems.map((recipe, index) => {
        return (recipe = { ...recipe, id: index });
      });
      setItems(recipesWithId);
    });
  }, []);

  const handleImagePreviewUrl = () => {
    const { imagePreviewUrl } = fileImage;
    if (imagePreviewUrl) {
      return (
        <img
          src={imagePreviewUrl}
          alt="preview"
          style={{ width: 'auto', height: '100px' }}
        />
      );
    }
    return null;
  };

  function checkRecipes() {
    console.log(items);
  }
  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function uploadToDatabase(downloadURL) {
    const item = {
      title: recipe.title,
      ingredients: recipe.ingredients,
      amount: recipe.amount,
      procedure: recipe.procedure
    };
    if (downloadURL) {
      item.imageUrl = downloadURL;
    }
    itemsRef.ref('items').push(item);
    setRecipe({
      title: '',
      ingredients: '',
      amount: '',
      procedure: ''
    });
  }

  function uploadFile() {
    const { file } = fileImage;
    const filename = file.name;
    const storageRef = storage.ref('/recipeImages/' + filename);
    if (file) {
      const uploadTask = storageRef.put(file);
      uploadTask.on(
        'state_changed',
        function(snapshot) {},
        function(error) {},
        function() {
          uploadTask.snapshot.ref.getDownloadURL().then(function(URL) {
            uploadToDatabase(URL);
            console.log('File available at', URL);
          });
        }
      );
    } else {
      uploadToDatabase();
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    uploadFile();
  }

  function handleOnChange({ target }) {
    const { value, name } = target;
    setRecipe({
      ...recipe,
      [name]: value
    });
  }

  function _handleImageChange(e) {
    e.preventDefault();
    const { files } = e.target;
    const reader = new FileReader();
    const file = files[0];

    reader.onloadend = () => {
      setFileImage({
        file: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignContent: 'center',
          height: '175px'
        }}
      >
        <div style={{ height: '100%', width: '100%' }}>
          <Header />

          <ButtonAddNew handleClickOpen={handleClickOpen} />
          <Button variant="outlined" color="primary">
            <Link to="/images">Images List!</Link>
          </Button>
          <Button variant="outlined" color="primary">
            <Link to="/RecipesList">Recipes List!</Link>
          </Button>
        </div>
      </div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <form onSubmit={handleSubmit}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="Close"
              >
                <Close />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Add New Recipe!
              </Typography>
              <Button color="inherit" onClick={checkRecipes}>
                Save
              </Button>
            </Toolbar>
          </AppBar>
          <TextField
            name="title"
            value={recipe.title}
            autoFocus
            margin="dense"
            id="name"
            label="Recipe Title"
            type="text"
            className={classes.textfield}
            onChange={handleOnChange}
          />
          <TextField
            name="ingredients"
            value={recipe.ingredients}
            autoFocus
            margin="dense"
            id="name"
            label="Ingredients"
            type="text"
            className={classes.textfield}
            onChange={handleOnChange}
          />
          <TextField
            name="amount"
            value={recipe.amount}
            autoFocus
            margin="dense"
            id="name"
            label="Amount"
            type="text"
            className={classes.textfield}
            onChange={handleOnChange}
          />
          <TextareaAutosize
            multiline="true"
            rows={2}
            rowsMax={4}
            name="procedure"
            value={recipe.procedure}
            onChange={handleOnChange}
          />
          <div>
            <div>
              <input type="file" onChange={_handleImageChange} />
            </div>
            {handleImagePreviewUrl()}
          </div>
          <input type="submit" value="Submit" />
        </form>
      </Dialog>
      <Route
        exact
        path="/images"
        render={() => <ImagesList imagesData={imagesData} />}
      />
      <Route
        exact
        path="/RecipesList"
        render={() => <RecipesList items={items} recipeKeys={recipeKeys} />}
      />
      <Route
        path={`/RecipesList/:productId`}
        render={({ match }) => (
          <RecipeDetail items={items} match={match} recipeKeys={recipeKeys} />
        )}
      />
      <Route
        path={`/images/:productId`}
        render={({ match }) => (
          <RecipeDetail items={items} match={match} recipeKeys={recipeKeys} />
        )}
      />
      <Route exact path="/" render={() => <Home imagesData={imagesData} />} />
    </div>
  );
}
