import React from 'react';
import './MainComponent.css';
import PinkArrow from '../../pinkarrow.svg';
import YellowArrow from '../../yellowarrow.svg';
import PurpleArrow from '../../purplearrow.svg';
import BlueArrow from '../../bluearrow.svg';
import AquaArrow from '../../aquaarrow.svg';
import getInspired from '../../getInspired.svg';
import browseRecipes from '../../browseRecipes.svg';
import moreYum from '../../moreYum.svg';
import aboutMe from '../../aboutMe.svg';
const MainComponent = () => {
  const style = {
    mainDiv: {
      width: '100vw',
      height: '100%'
    }
  };
  return (
    <div style={style.mainDiv}>
      <img className="pinkArrow" src={PinkArrow} alt="pinkarrow" />
      <img className="yellowArrow" src={YellowArrow} alt="yellowarrow" />
      <img className="blueArrow" src={BlueArrow} alt="bluearrow" />
      <img className="aquaArrow" src={AquaArrow} alt="aquaarrow" />
      <img className="purpleArrow" src={PurpleArrow} alt="purplearrow" />
      <img
        className="getInspired"
        src={getInspired}
        alt="get inspired by a gallery of images"
      />
      <img className="browseRecipes" src={browseRecipes} alt="browse recipes" />
      <img className="moreYum" src={moreYum} alt="more yum recipes" />
      <img className="aboutMe" src={aboutMe} alt="about me" />
    </div>
  );
};

export default MainComponent;
