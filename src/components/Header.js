import React from 'react';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        fontFamily: 'Annie Use Your Telescope',
        fontSize: '3vw',
        flexShrink: '0'
      }}
    >
      <Link style={{ textDecoration: 'none' }} to="/">
        <h1
          style={{
            textShadow:
              'rgba(23, 80, 243, 0.58) 0px 0px 10px, rgb(255, 255, 255) 0px 0px 10px',
            color: 'black'
          }}
        >
          MY RECIPES!
        </h1>
      </Link>
    </div>
  );
};
export default Header;
