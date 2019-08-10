import React, { useState, useEffect } from 'react';
import RecipeItem from './RecipeItem';
import { itemsRef } from '../../firebase';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Link, Route } from 'react-router-dom';

const RecipesList = ({ items, recipeKeys }) => {
  const [state, setState] = useState([]);
  console.log(recipeKeys);
  const deleteRecipes = () => {
    const dataKeys = Object.keys(recipeKeys);
    const stateCopy = JSON.parse(JSON.stringify(state));
    Object.keys(stateCopy).forEach(key => {
      if (!stateCopy[key]) delete stateCopy[key];
    });
    const keysToBeDeleted = [];
    for (let key in stateCopy) {
      keysToBeDeleted.push(dataKeys[key]);
    }
    keysToBeDeleted.forEach(key => {
      itemsRef
        .ref('items')
        .child(key)
        .remove();
    });
    console.log(stateCopy);
    console.log(keysToBeDeleted);
    console.log(dataKeys);
    setState([]);
  };
  console.log(items);
  const renderedList = items.map((item, index) => {
    const deleteRecipe = () => {
      const keys = Object.keys(recipeKeys);
      const key = keys[index];
      itemsRef
        .ref('items')
        .child(key)
        .remove();
    };
    const updateRecipe = () => {};

    const checkboxOnChange = e => {
      setState({ ...state, [index]: e.target.checked });
    };
    return (
      <RecipeItem
        key={item.id}
        recipe={item}
        deleteRecipe={deleteRecipe}
        index={index}
        state={{ state }[index]}
        checkboxOnChange={checkboxOnChange}
        updateRecipe={updateRecipe}
      />
    );
  });
  console.log(state);
  return (
    <div>
      <Button
        size="small"
        color="primary"
        onClick={() => deleteRecipes()}
        disabled={!renderedList.length}
      >
        DELETE
      </Button>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 350px))',
            gridGap: '25px',
            width: '80%',
            gridAutoFlow: 'dense',
            justifyContent: 'center'
          }}
        >
          {renderedList.reverse()}
        </div>
      </div>
    </div>
  );
};

export default RecipesList;
