import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import MainComponent from './MainComponent';

const Home = ({ imagesData }) => {
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
    lastRecipeImgTag: {
      width: '20vw',
      top: 150,
      left: '3vw',
      position: 'absolute',
      border: '5px solid mediumpurple',
      minWidth: 188
    },
    pTagAboveLastRecipe: {
      position: 'absolute',
      top: 80,
      left: '3vw',
      textAlign: 'center',
      width: '20vw',
      minWidth: 188,
      font: 'italic 168% "Fira Sans", serif',
      color: '#defd01'
    }
  };

  if (imagesData.length) {
    const { image, title, id } = imagesData[0];
    const lastRecipe = (
      <div className="divLastRecipe" style={style.divLastRecipe}>
        <p style={style.pTagAboveLastRecipe}>Newest Recipe</p>
        <Link to={`/RecipesList/${id}`}>
          <img src={image} alt={title} style={style.lastRecipeImgTag} />
        </Link>
      </div>
    );

    return (
      <div className="main" style={style.styleMainDiv}>
        <div className="SideDiv" style={style.styleSideDiv} />
        <div className="HorizontalDiv" style={style.styleHorizontalDiv} />
        <div style={style.styleBigDiv} />
        <div>{lastRecipe}</div>
        <div>
          <MainComponent />
        </div>
      </div>
    );
  } else {
    return <CircularProgress size={100} />;
  }
};

export default Home;
