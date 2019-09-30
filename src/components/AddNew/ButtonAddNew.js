import React from 'react';
import buttonPinkImage from '../../buttonimagepink.svg';
import { Link } from 'react-router-dom';
const ButtonAddNew = ({ handleClickOpen, signedin }) => {
  const style = {
    addNewImage: {
      width: '100%',
      display: 'block',
      height: 'auto',
      cursor: 'pointer'
    },
    addNewInnerDiv: {
      textAlign: 'center',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-47%, -43%)',
      width: '100%',
      fontFamily: 'Annie Use Your Telescope',
      fontSize: '2.7vw',
      color: 'white',
      textShadow: '0 0 3px #d45ad8, 0 0 5px #d45ad8',
      cursor: 'pointer'
    },
    linkStyle: {
      textAlign: 'center',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-47%, -43%)',
      width: '100%',
      fontFamily: 'Annie Use Your Telescope',
      fontSize: '3.7vw',
      color: 'white',
      textShadow: '0 0 3px #d45ad8, 0 0 5px #d45ad8',
      cursor: 'pointer',
      textDecoration: 'none'
    },
    mainDivAddNew: {
      position: 'relative',
      width: '19%'
    }
  };
  return (
    <div className="mainDivAddNew" style={style.mainDivAddNew}>
      <img
        className="addNewImage"
        src={buttonPinkImage}
        alt="buttongreenimage"
        style={style.addNewImage}
      />
      {signedin === true ? (
        <div
          className="addNewInnerDiv"
          onClick={handleClickOpen}
          style={style.addNewInnerDiv}
        >
          ADD NEW <br />
          RECIPE
        </div>
      ) : (
        <div>
          <Link style={style.linkStyle} to="/">
            HOME
          </Link>
        </div>
      )}
    </div>
  );
};

export default ButtonAddNew;
