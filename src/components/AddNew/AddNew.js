import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
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
import AboutMe from '../AboutMe/AboutMe';
import ApiSearch from '../OtherBlogs/ApiSearch';
import ButtonAddNew from '../AddNew/ButtonAddNew';
import ImagesList from '../ImagesOnly/ImagesList';
import SignIn from '../SignIn';
import Footer from '../Footer';
import { Route, Link } from 'react-router-dom';
import RecipeDetail from '../AllRecipes/RecipeDetail';
import Home from '../home/Home';
import buttonBlueImage from '../../nn.svg';
import buttonGreenImage from '../../greenButton.svg';
import mainBackground from '../../mainbackground.png';
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
  },
  imagesButton: {
    textDecoration: 'none'
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
  const [signedin, setSignedin] = useState(false);
  const imagesDataFirst = items.filter(item => (item.image ? true : false));
  const imagesData = imagesDataFirst.reverse();

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

  const handleSignedin = () => {
    setSignedin(true);
  };
  const handleNotSignedin = () => {
    setSignedin(false);
  };

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
    <div
      style={{
        backgroundImage: `url(${mainBackground})`,
        backgroundAttachment: 'fixed',
        minHeight: '100vw',
        minWidth: 900,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignContent: 'center',
          flexDirection: 'column'
        }}
      >
        <Header />
        <div
          style={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: '2vw'
          }}
        >
          <ButtonAddNew handleClickOpen={handleClickOpen} signedin={signedin} />
          <div
            style={{
              position: 'relative',
              width: '15%',
              marginLeft: '3vw',
              marginRight: '3vw'
            }}
          >
            <Link style={{ textDecoration: 'none' }} to="/images">
              <img
                src={buttonBlueImage}
                alt="buttonimage"
                style={{
                  width: '100%',
                  display: 'block',
                  height: 'auto'
                }}
              />
              <div
                style={{
                  textAlign: 'center',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '100%',
                  fontFamily: 'Annie Use Your Telescope',
                  fontSize: '252%',
                  color: 'white',
                  textShadow: '0 0 3px #25bef2, 0 0 5px #25bef2'
                }}
              >
                IMAGES
              </div>
            </Link>
          </div>
          <div style={{ position: 'relative', width: '17%' }}>
            <Link style={{ textDecoration: 'none' }} to="/RecipesList">
              <img
                src={buttonGreenImage}
                alt="buttongreenimage"
                style={{
                  width: '100%',
                  display: 'block',
                  height: 'auto'
                }}
              />
              <div
                style={{
                  textAlign: 'center',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '100%',
                  fontFamily: 'Annie Use Your Telescope',
                  fontSize: '247%',
                  color: 'white',
                  textShadow: '0 0 3px #08c193, 0 0 5px #08c193'
                }}
              >
                RECIPES
              </div>
            </Link>
          </div>
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
      <div style={{ flexGrow: '1', marginBottom: '15vh' }}>
        <Route
          exact
          path="/images"
          render={() => <ImagesList imagesData={imagesData} />}
        />
        <Route
          exact
          path="/RecipesList"
          render={() => (
            <RecipesList
              items={items}
              recipeKeys={recipeKeys}
              signedin={signedin}
            />
          )}
        />
        <Route
          path={`/RecipesList/:productId`}
          render={({ match }) => (
            <RecipeDetail
              items={items}
              match={match}
              recipeKeys={recipeKeys}
              signedin={signedin}
            />
          )}
        />
        <Route
          path={`/images/:productId`}
          render={({ match }) => (
            <RecipeDetail
              items={items}
              match={match}
              recipeKeys={recipeKeys}
              signedin={signedin}
            />
          )}
        />
        <Route exact path="/" render={() => <Home imagesData={imagesData} />} />
        <Route exact path="/AboutMe" render={() => <AboutMe />} />
        <Route
          exact
          path="/signin"
          render={() => (
            <SignIn
              onSignedin={handleSignedin}
              onSignedout={handleNotSignedin}
            />
          )}
        />
        <Route exact path="/OtherBlogs" render={() => <ApiSearch />} />
      </div>
      <Footer />
    </div>
  );
}
