import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@material-ui/core';
import ApiSearchCard from './ApiSearchCard';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: 'none'
  },
  inputDiv: {
    borderBottom: '1px solid gray',
    '&:hover': {
      borderBottom: '1px solid pink'
    }
  }
}));

const ApiSearch = () => {
  const classes = useStyles();
  const [value, setValue] = useState('');
  const [toBeRendered, setToBeRedered] = useState(null);
  const YOUR_APP_ID = '794d4355';
  const YOUR_APP_KEY = 'ba7fb68dec11e92ce460d335790a384b';
  // let divRecipes = null; //get value at init(url) function
  //useEffect(() => {}, [divRecipes]);
  useEffect(() => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
  }, []);

  const style = {
    styleMainDiv: {
      display: 'flex',
      minHeight: 900,
      position: 'relative'
    },
    styleSideDiv: {
      width: '25%',
      height: 790,
      backgroundColor: '#ff5775ed',
      position: 'absolute'
    },
    styleHorizontalDiv: {
      position: 'absolute',
      height: 105,
      width: '80%',
      backgroundColor: '#f0ff264a',
      left: 90,
      top: 30
    },
    styleBigDiv: {
      height: 790,
      width: '95%',
      backgroundColor: '#3500ff42',
      position: 'absolute',
      right: 10,
      top: 100
    },
    divFindRecipes: {
      height: 100,
      display: 'flex',
      position: 'absolute',
      left: '27%',
      alignItems: 'flex-end',
      justifyContent: 'space-around',
      minWidth: 500
    },
    textFieldWPlaceH: {
      width: '80%',
      color: 'pink'
    },
    findRecipesButton: {
      width: '2vw',
      height: 30,
      color: '#95ffcb',
      backgroundColor: '#503bff8a'
    },
    toBeRenderedDiv: {
      display: 'flex',
      width: '80%',
      minWidth: 673,
      position: 'absolute',
      left: '20%',
      top: '12%',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    BrowseTitle: {
      fontSize: 40,
      fontFamily: 'Annie Use Your Telescope',
      minWidth: 400,
      color: '#0895ff',
      fontWeight: 'bolder'
    },
    blogsThatInspireDiv: {
      div: {
        width: '26%',
        height: '100vh',
        marginLeft: '10px',
        display: 'flex',
        justifyContent: 'center',
        top: 99,
        position: 'absolute'
      },
      pTag: {
        position: 'absolute',
        font: 'italic 3vh "Fira Sans", serif',
        color: '#e2e1ff',
        margin: 10
      },
      href1: {
        position: 'absolute',
        top: '10%',
        font: 'italic 3vh "Fira Sans", serif',
        color: '#ebff00'
      },
      href2: {
        position: 'absolute',
        top: '20%',
        font: 'italic 3vh "Fira Sans", serif',
        color: '#ebff00'
      },
      href3: {
        position: 'absolute',
        top: '30%',
        font: 'italic 3vh "Fira Sans", serif',
        color: '#ebff00'
      },
      href4: {
        position: 'absolute',
        top: '40%',
        font: 'italic 3vh "Fira Sans", serif',
        color: '#ebff00'
      }
    }
  };
  const handleChange = e => {
    setValue(e.target.value);
  };
  function getRecipe() {
    init(
      `https://api.edamam.com/search?q=${value}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=6&health=vegan`
    );
  }
  async function init(url) {
    try {
      const resp = await fetch(url);
      const recipes = await resp.json();
      setToBeRedered(
        recipes.hits.map(item => {
          return <ApiSearchCard item={item} key={item.url} />;
        })
      );

      console.log(recipes);
    } catch (e) {
      console.log('e with fetching');
      throw e;
    }
  }

  return (
    <div style={style.styleMainDiv}>
      <div className="SideDiv" style={style.styleSideDiv} />
      <div className="HorizontalDiv" style={style.styleHorizontalDiv} />
      <div style={style.styleBigDiv} />
      <div style={style.blogsThatInspireDiv}>
        <p style={style.blogsThatInspire.pTag}>
          Awesome Blogs That Inspire Me:
        </p>
        <a href="https://www.feastingonfruit.com/" target="_blank">
          Feasting On Fruit
        </a>
        <a href="https://www.veganricha.com/" target="_blank">
          Vegan Richa
        </a>
        <a href="https://ohsheglows.com/" target="_blank">
          Oh She Glows
        </a>
        <a href="https://sweetsimplevegan.com/" target="_blank">
          Sweet Simple Vegan
        </a>
      </div>
      <div style={style.divFindRecipes}>
        <TextField
          id="standard-with-placeholder"
          label="Find A New Recipe!"
          placeholder="Yum Recipe"
          margin="normal"
          value={value}
          onChange={handleChange}
          style={style.textFieldWPlaceH}
          InputLabelProps={{
            style: {
              color: 'pink'
            }
          }}
          InputProps={{
            style: {
              color: 'pink'
            },
            disableUnderline: true,
            className: classes.inputDiv
          }}
        />
        <Button
          variant="contained"
          className={classes.button}
          type="submit"
          onClick={getRecipe}
          style={style.findRecipesButton}
        >
          Search!
        </Button>
      </div>
      <div className="toBeRenderedDiv" style={style.toBeRenderedDiv}>
        {toBeRendered}
      </div>
    </div>
  );
};

export default ApiSearch;
