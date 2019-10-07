import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ImagesList.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

const ImagesList = ({ imagesData }) => {
  const itemsPerPage = 12;
  const [page, setPage] = useState(1);
  const [leftButton, setLeftButton] = useState(1);
  const [centerButton, setCenterButton] = useState(1);
  const [rightButton, setRightButton] = useState(1);
  const numberOfPages = Math.ceil(imagesData.length / itemsPerPage);
  useEffect(() => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
  }, []);

  useEffect(() => {
    if ((page === 1 || page === 2) & (numberOfPages >= 3)) {
      setRightButton(3);
      setCenterButton(2);
      setLeftButton(1);
    } else if ((page === 1) & (numberOfPages === 1)) {
      setRightButton(null);
      setCenterButton(1);
      setLeftButton(null);
    } else if ((page === 1) & (numberOfPages === 2)) {
      setRightButton(2);
      setCenterButton(1);
      setLeftButton(null);
    } else if ((page === 2) & (numberOfPages === 2)) {
      setRightButton(null);
      setCenterButton(2);
      setLeftButton(1);
    } else if (
      (page <= numberOfPages - 2) &
      (page >= 3) &
      (numberOfPages > 3)
    ) {
      setRightButton(page + 1);
      setCenterButton(page);
      setLeftButton(page - 1);
    } else if (
      (page === numberOfPages - 1 || page === numberOfPages) &
      (numberOfPages >= 3)
    ) {
      setRightButton(numberOfPages);
      setCenterButton(numberOfPages - 1);
      setLeftButton(numberOfPages - 2);
    }
  }, [page, numberOfPages, imagesData]);

  const firstPage = () => {
    setPage(1);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
  };
  const previousPage = () => {
    setPage(page - 1);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
  };
  const numberButton = prop => {
    setPage(prop);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
  };
  const nextPage = () => {
    setPage(page + 1);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
  };
  const lastPage = () => {
    setPage(numberOfPages);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
  };

  const firstPrevious = () => {
    if (page === 1) {
      return true;
    } else {
      return false;
    }
  };

  const lastNext = () => {
    if (page === numberOfPages) {
      return true;
    } else {
      return false;
    }
  };

  const centerButtonDisable = () => {
    if (centerButton === page) {
      return true;
    } else {
      return false;
    }
  };

  const rightButtonDisable = () => {
    if (rightButton === page) {
      return true;
    } else {
      return false;
    }
  };

  if (imagesData.length) {
    return (
      <div>
        <div
          style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
        >
          <div
            style={{
              display: 'flex',
              width: '80%',
              justifyContent: 'center',
              minHeight: 600
            }}
          >
            <div className={imagesData.length > 12 ? 'flexbox' : 'flexbox2'}>
              {imagesData
                .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                .map((tile, index) => {
                  return (
                    <div
                      className={imagesData.length > 12 ? 'image' : 'image2'}
                      key={tile.id}
                    >
                      <Link to={`/images/${tile.id}`}>
                        <img
                          className="imageTag"
                          key={tile.id}
                          src={tile.image}
                          alt={tile.title}
                        />
                      </Link>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div
          style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}
        >
          <Button onClick={firstPage} disabled={firstPrevious()}>
            First
          </Button>
          <Button onClick={previousPage} disabled={firstPrevious()}>
            Previous
          </Button>
          {leftButton && (
            <Button
              onClick={() => numberButton(leftButton)}
              disabled={firstPrevious()}
            >
              {leftButton}
            </Button>
          )}
          <Button
            onClick={() => numberButton(centerButton)}
            disabled={centerButtonDisable()}
          >
            {centerButton}
          </Button>
          {rightButton && (
            <Button
              onClick={() => numberButton(rightButton)}
              disabled={rightButtonDisable()}
            >
              {rightButton}
            </Button>
          )}
          <Button onClick={nextPage} disabled={lastNext()}>
            Next
          </Button>
          <Button onClick={lastPage} disabled={lastNext()}>
            Last
          </Button>
        </div>
      </div>
    );
  } else {
    return <CircularProgress size={100} />;
  }
};

export default ImagesList;
