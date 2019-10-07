import React, { useState, useEffect } from 'react';
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
import CircularProgress from '@material-ui/core/CircularProgress';
import { Close } from '@material-ui/icons';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { makeStyles } from '@material-ui/core/styles';
import { itemsRef, storage } from '../../firebase';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
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

const RecipeDetail = ({ items, match, recipeKeys, signedin }) => {
  const [open, setOpen] = useState(false);
  const [recipe, setRecipe] = useState({
    title: '',
    ingredients: '',
    image: '',
    procedure: '',
    amount: ''
  });
  const [fileImage, setFileImage] = useState({
    file: '',
    imagePreviewUrl: ''
  });
  const classes = useStyles();
  const index = match.params.productId;
  const dataKeys = Object.keys(recipeKeys);

  useEffect(() => {
    // code to run on component mount
    const { title, ingredients, image, procedure, amount } = items[index];
    setRecipe({
      title,
      ingredients,
      image,
      procedure,
      amount
    });
  }, [items, index]);

  function handleClose() {
    setOpen(false);
  }
  function handleClickOpen() {
    setOpen(true);
  }

  function handleOnChange({ target }) {
    const { value, name } = target;
    setRecipe({
      ...recipe,
      [name]: value
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    uploadFile();
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

  function updateDatabase(downloadURL) {
    const item = {
      title: recipe.title,
      ingredients: recipe.ingredients,
      amount: recipe.amount,
      procedure: recipe.procedure
    };
    if (downloadURL) {
      item.imageUrl = downloadURL;
    }
    const postKey = dataKeys[index];
    var updates = {};
    updates['/items/' + postKey] = item;
    itemsRef.ref().update(updates);
    setOpen(false);
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
            updateDatabase(URL);
          });
        }
      );
    } else if (recipe.image) {
      updateDatabase(recipe.image);
    } else {
      updateDatabase();
    }
  }

  if (items.length) {
    const { ingredients, title, image, procedure, amount } = items[index];
    const ingredientsArr = ingredients.split(',');
    const ingredientsList = ingredientsArr.map(i => <li key={i}>{i}</li>);

    return (
      <div>
        <div>
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
                {recipe.image ? (
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    style={{ height: '100px', width: 'auto' }}
                  />
                ) : null}
              </div>
              <input type="submit" value="Submit" />
            </form>
          </Dialog>
        </div>
        <div
          id="background"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <div
            style={{
              width: '70%',
              height: '100%',
              backgroundColor: 'aliceblue',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              borderRadius: '50px',
              alignItems: 'center',
              border: '#13258a0d solid'
            }}
            id="background"
          >
            {signedin ? (
              <div
                style={{
                  height: '25px',
                  marginLeft: '5%',
                  marginTop: '2%',
                  alignSelf: 'flex-start'
                }}
              >
                <Button
                  color="inherit"
                  onClick={handleClickOpen}
                  style={{ color: '#453b50ad' }}
                >
                  UPDATE
                </Button>
              </div>
            ) : null}
            <div
              style={{
                width: '90%',
                height: 'auto',
                backgroundColor: 'white',
                margin: '5%',
                borderRadius: '12px',
                border: '10px outset #c47eff80'
              }}
            >
              {image ? (
                <img
                  id="i"
                  src={image}
                  alt={title}
                  style={{ width: '40%', float: 'right', padding: '10px' }}
                />
              ) : null}
              <h1
                style={{
                  textAlign: 'center',
                  font: 'italic 50px "Fira Sans", serif',
                  color: '#4b4e54'
                }}
              >
                {title}
              </h1>
              <div style={{ paddingLeft: '10px' }}>
                <hr
                  style={{
                    border: '0',
                    height: '1px',
                    backgroundImage:
                      'linear-gradient(to right, rgba(0, 0, 0, 0), #c47eff80, rgba(0, 0, 0, 0))'
                  }}
                />
                <h3
                  style={{ font: '1.2em "Fira Sans", serif', color: '#60646b' }}
                >
                  INGREDIENTS
                </h3>
                <ul
                  style={{
                    listStyleImage:
                      'url(https://image.flaticon.com/icons/svg/535/535285.svg)',
                    color: '#6975b7'
                  }}
                >
                  {ingredientsList}
                </ul>
                <hr
                  style={{
                    border: '0',
                    height: '1px',
                    backgroundImage:
                      'linear-gradient(to right, rgba(0, 0, 0, 0), #c47eff80, rgba(0, 0, 0, 0))'
                  }}
                />
                <h3
                  style={{ font: '1.2em "Fira Sans", serif', color: '#60646b' }}
                >
                  PROCEDURE
                </h3>
                <h3
                  style={{
                    font: '1em "Fira Sans", serif',
                    color: '#6975b7',
                    paddingInlineStart: '35px'
                  }}
                >
                  {procedure}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <CircularProgress size={100} />;
  }
};

export default RecipeDetail;
