import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    maxWidth: '25%',
    margin: 15,
    backgroundColor: '#f2e9fd',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: '145%',
    color: '#4376c7',
    minHeight: 35
  },
  p: {
    fontSize: '1.5vh',
    color: '#1d2b46b5',
    minHeight: 80,
    maxHeight: 90,
    padding: 3,
    overflow: 'scroll'
  },
  learnMoreButton: {
    bottom: 0,
    left: '50%',
    marginLeft: '-50px'
  },
  cardActionsContainer: {
    height: 10
  }
});

export default function ApiSearchCard({ item }) {
  const { recipe } = item;
  const { image, ingredientLines, url, label: title } = recipe;
  const classes = useStyles();
  const ingredientString = ingredientLines.join(',');
  return (
    <Card className={classes.card}>
      <CardActionArea
        onClick={() => {
          window.open(url, '_blank');
        }}
      >
        <CardMedia
          component="img"
          alt={title}
          height="140"
          image={image}
          title={title}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className={classes.title}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.p}
          >
            {ingredientString}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
