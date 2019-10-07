import React, { useEffect, useState, useRef } from 'react';
import MyImage from '../../unnamed.png';
import './AboutMe.css';
import { Zoom } from '@material-ui/core';

const AboutMe = () => {
  const [checked, setChecked] = useState(false);
  const imageDiv = useRef(null);
  useEffect(() => {
    setChecked(true);
  }, []);
  useEffect(() => {
    imageDiv.current.scrollIntoView({ behavior: 'smooth' });
    //document.body.scrollTop = 20; // For Safari
    // document.documentElement.scrollTop = 20;
  }, []);

  return (
    <div className="divOne" ref={imageDiv}>
      <Zoom in={checked}>
        <div className="divTwo">
          <div>
            <h1 className="aboutMeh1">Candela Sarrabayrouse</h1>
          </div>
          <div className="pDiv">
            Hi there! I welcome you to the website that I've created to show you
            my collection of recipes.
            <br />
            I've built it by using React (w/ hooks :) ), React Router, Firebase
            (Authentication, Realtime, Storage) and Material UI.
            <br />
            I hope you enjoy browsing through my recipes.
            <br />
            Feel free to e-mail me with any feedback at
            sarrabayrouse.business@gmail.com
          </div>
        </div>
      </Zoom>
      <Zoom in={checked} style={{ transitionDelay: checked ? '800ms' : '0ms' }}>
        <div className="divThree">
          <img src={MyImage} alt="myself" className="imageTagMe" />
        </div>
      </Zoom>
    </div>
  );
};
export default AboutMe;
//</Zoom>
