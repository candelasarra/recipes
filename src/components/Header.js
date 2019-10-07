import React from 'react';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        fontFamily: 'Annie Use Your Telescope'
      }}
    >
      <div
        style={{
          position: 'relative',
          minWidth: 500
        }}
      >
        <Link style={{ textDecoration: 'none', fontSize: '489%' }} to="/">
          <h1
            style={{
              textShadow:
                'rgba(23, 80, 243, 0.58) 0px 0px 10px, rgb(255, 255, 255) 0px 0px 10px',
              color: 'black',
              textAlign: 'center',
              fontSize: 'inherit'
            }}
          >
            THE RECIPES
          </h1>
        </Link>
      </div>
    </div>
  );
};
export default Header;
