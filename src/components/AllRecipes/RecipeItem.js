import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles({
  root: {},
  card: {
    width: 350
  },
  media: {
    height: 275
  }
});

const RecipeItem = ({
  recipe,
  deleteRecipe,
  index,
  state,
  checkboxOnChange,
  updateRecipe
}) => {
  const classes = useStyles();

  return (
    <div>
      <Grid key={recipe.title} item className={classes.root}>
        <Card className={classes.card}>
          <Link to={`/RecipesList/${recipe.id}`}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={recipe.image}
                title={recipe.title}
              >
                {!recipe.image && <Typography />}
              </CardMedia>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  noWrap={true}
                >
                  {recipe.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  noWrap={true}
                >
                  {recipe.ingredients}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Link>
          <CardActions>
            <Button size="small" color="primary" onClick={() => deleteRecipe()}>
              DELETE
            </Button>
            <div>
              <Checkbox
                checked={state}
                onChange={checkboxOnChange}
                value="checkedA"
                inputProps={{
                  'aria-label': 'primary checkbox'
                }}
              />
            </div>
          </CardActions>
        </Card>
      </Grid>
    </div>
  );
};
export default RecipeItem;
