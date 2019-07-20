import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { itemsRef, storage } from '../../firebase';
import firebase from 'firebase/app';
import RecipesList from '../AllRecipes/RecipesList';
import Header from '../Header';

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
  const [open, setOpen] = React.useState(false);
  const [fileImage, setFileImage] = React.useState({
    file: '',
    imagePreviewUrl: ''
  });
  const [recipe, setRecipe] = React.useState({
    title: '',
    ingredients: '',
    amount: '',
    procedure: ''
  });
  const [items, setItems] = React.useState([]);

  useEffect(() => {
    // code to run on component mount
    itemsRef.ref('items').on('value', snapshot => {
      let recipes = snapshot.val();
      let newItems = [];
      for (let oneRecipe in recipes) {
        newItems.push({
          title: recipes[oneRecipe].title,
          ingredients: recipes[oneRecipe].ingredients,
          amount: recipes[oneRecipe].amount,
          procedure: recipes[oneRecipe].procedure,
          image: recipes[oneRecipe].imageUrl
        });
      }
      setItems(newItems);
    });
  }, []);

  let item;

  let { imagePreviewUrl } = fileImage;
  let $imagePreview = null;
  if (imagePreviewUrl) {
    $imagePreview = (
      <img
        src={imagePreviewUrl}
        alt="preview"
        style={{ width: 'auto', height: '100px' }}
      />
    );
  }
  function checkRecipes() {
    console.log(items);
  }
  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }
  function uploadFile() {
    let { file } = fileImage;
    let filename = file.name;
    let storageRef = storage.ref('/recipeImages/' + filename);
    let uploadTask = storageRef.put(file);

    uploadTask.on(
      'state_changed',
      function(snapshot) {},
      function(error) {},
      function() {
        uploadTask.snapshot.ref.getDownloadURL().then(function(URL) {
          let downloadURL = URL;
          console.log('File available at', URL);
          item = {
            title: recipe.title,
            ingredients: recipe.ingredients,
            amount: recipe.amount,
            procedure: recipe.procedure,
            imageUrl: downloadURL
          };
          itemsRef.ref('items').push(item);
          setRecipe({
            title: '',
            ingredients: '',
            amount: '',
            procedure: ''
          });
        });
      }
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    uploadFile();
    //setFileImage({
    //file: '',
    //imagePreviewUrl: ''
    //});
  }

  function handleOnChange(e) {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value
    });
  }

  function _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

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
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Add New Recipe!
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
                <CloseIcon />
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
            {$imagePreview}
          </div>
          <input type="submit" value="Submit" />
        </form>
      </Dialog>
      <RecipesList items={items} />
    </div>
  );
}
