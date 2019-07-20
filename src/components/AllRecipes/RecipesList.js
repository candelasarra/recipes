import React from 'react';
import RecipeItem from './RecipeItem';
import RecipeDetail from './RecipeDetail';
import Grid from '@material-ui/core/Grid';

const RecipesList = ({ items }) => {
  const [componentRender, setComponentRender] = React.useState({
    list: true,
    detail: false,
    chosenRecipe: null
  });
  const onRecipeSelect = item => {
    setComponentRender({
      list: false,
      detail: true,
      chosenRecipe: item
    });
  };
  const backToList = () => {
    setComponentRender({
      list: true,
      detail: false,
      chosenRecipe: null
    });
  };

  const renderedList = items.map((item, index) => {
    return (
      <RecipeItem key={index} recipe={item} onRecipeSelect={onRecipeSelect} />
    );
  });
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div>
        <Grid
          container
          spacing={8}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridColumnGap: '1%',
            gridTemplateRows: 'repeat(auto, auto)',
            justifyContent: 'space-around'
          }}
        >
          {componentRender.list && renderedList}
        </Grid>
      </div>
      {componentRender.detail && (
        <RecipeDetail
          recipe={componentRender.chosenRecipe}
          backToList={backToList}
        />
      )}
    </div>
  );
};

export default RecipesList;