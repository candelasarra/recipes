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

const useStyles = makeStyles({
  card: {
    width: 345
  },
  media: {
    height: 140
  }
});

const RecipeItem = ({ recipe, onRecipeSelect }) => {
  const classes = useStyles();

  return (
    <Grid key={recipe.title} item>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={recipe.image}
            title={recipe.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {recipe.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {recipe.ingredients}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => onRecipeSelect(recipe)}
          >
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
export default RecipeItem;
