import React from 'react';
import Button from '@material-ui/core/Button';

const RecipeDetail = ({ recipe, backToList }) => {
  return (
    <div>
      <Button size="small" color="secondary" onClick={() => backToList()}>
        Back to list
      </Button>
      <h1>HI RECIPE DETAIL RENDERED</h1>
      <img src={recipe.image} alt={recipe.title} />
    </div>
  );
};

export default RecipeDetail;
