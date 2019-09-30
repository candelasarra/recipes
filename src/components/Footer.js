import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const styleDiv = {
    height: 100,
    width: 'auto',
    backgroundColor: '#20f2458f',
    flexShrink: '0',
    display: 'flex',
    justifyContent: 'center'
  };
  const styleInnerDiv = {
    width: '40%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };
  const styleP = {
    font: 'italic 2.5vh "Fira Sans", serif',
    color: 'cornflowerblue',
    textAlign: 'center'
  };
  const stylePaboutme = {
    font: 'italic 2.5vh "Fira Sans", serif',
    color: 'cornflowerblue',
    fontWeight: 'bold',
    textAlign: 'center'
  };

  return (
    <div style={styleDiv}>
      <div style={styleInnerDiv}>
        <Link style={{ textDecoration: 'none' }} to="/RecipesList">
          <p style={styleP}>Recipes List</p>
        </Link>
        <Link style={{ textDecoration: 'none' }} to="/images">
          <p style={styleP}>Images Gallery</p>
        </Link>
        <Link style={{ textDecoration: 'none' }} to="/OtherBlogs">
          <p style={styleP}>Other Blogs</p>
        </Link>
        <Link style={{ textDecoration: 'none' }} to="/AboutMe">
          <p style={stylePaboutme}>About Me</p>
        </Link>
      </div>
    </div>
  );
};
export default Footer;
