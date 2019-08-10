import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ImagesList.css';
import CircularProgress from '@material-ui/core/CircularProgress';

let currentPage = 1;

const ImagesList = ({ imagesData }) => {
  // const [pageList, setPageList] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  //const [numberOfPages, setNumberOfPages] = useState(1);
  const [leftButton, setLeftButton] = useState(null);
  const [centerButton, setCenterButton] = useState(null);
  const [rightButton, setRightButton] = useState(null);
  const [currentList, setCurrentList] = useState([]);
  const numberPerPage = 14;
  let listOfImages = [];
  const numberOfPages = Math.ceil(imagesData.length / numberPerPage);

  useEffect(() => {
    console.log('useEffect triggered');
    loadList();
    console.log('useEffect triggered');
  }, [imagesData]);

  function loadList() {
    console.log('loadList triggered');
    console.log(currentPage);
    console.log(numberOfPages);
    const begin = (currentPage - 1) * numberPerPage;
    let end;
    if (begin + numberPerPage <= imagesData.length) {
      end = begin + numberPerPage;
    } else {
      end = imagesData.length;
    }
    console.log('im begin:', begin);
    console.log('im end:', end);
    const pageListCut = imagesData.slice(begin, end);
    console.log(pageListCut);
    drawList(pageListCut);
    if ((currentPage === 1 || currentPage === 2) & (numberOfPages >= 3)) {
      setRightButton(3);
      setCenterButton(2);
      setLeftButton(1);
    } else if ((currentPage === 1) & (numberOfPages === 1)) {
      setRightButton(null);
      setCenterButton(1);
      setLeftButton(null);
    } else if ((currentPage === 1) & (numberOfPages === 2)) {
      setRightButton(2);
      setCenterButton(1);
      setLeftButton(null);
    } else if ((currentPage === 2) & (numberOfPages === 2)) {
      setRightButton(null);
      setCenterButton(2);
      setLeftButton(1);
    } else if ((currentPage >= 3) & (numberOfPages > 3)) {
      setRightButton(currentPage + 1);
      setCenterButton(currentPage);
      setLeftButton(currentPage - 1);
    } else if (
      currentPage === numberOfPages ||
      (currentPage === numberOfPages - 1) & (numberOfPages > 3)
    ) {
      setRightButton(numberOfPages);
      setCenterButton(numberOfPages - 1);
      setLeftButton(numberOfPages - 2);
    }
  }
  const drawList = pageListCut => {
    console.log('drawList triggered');
    listOfImages = pageListCut.map((tile, index) => {
      return (
        <div className={imagesData.length > 12 ? 'image' : 'image2'}>
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
    });
    setCurrentList(listOfImages);
    console.log(currentList);
    console.log(currentPage);
  };

  const firstPage = () => {
    currentPage = 1;
    loadList();
  };
  const previousPage = () => {
    console.log('first console in previous page fn:', currentPage);
    currentPage -= 1;
    console.log('second conosole in previous:', currentPage);
    loadList();
  };
  const centerButtonPage = () => {
    currentPage = 2;
    loadList();
  };
  const nextPage = () => {
    currentPage++;
    console.log(currentPage);
    loadList();
  };
  const lastPage = () => {
    currentPage = numberOfPages;
    loadList();
  };

  console.log(currentList);
  console.log(imagesData);
  console.log(currentPage);
  if (currentList.length) {
    return (
      <div>
        <div
          style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
        >
          <div
            style={{ display: 'flex', width: '90%', justifyContent: 'center' }}
          >
            <div className={imagesData.length > 12 ? 'flexbox' : 'flexbox2'}>
              {currentList}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <button onClick={firstPage}>First</button>
          <button onClick={previousPage}>Previous</button>
          <button onClick={previousPage}>{leftButton}</button>
          <button onClick={centerButtonPage}>{centerButton}</button>
          <button onClick={nextPage}>{rightButton}</button>
          <button onClick={nextPage}>Next</button>
          <button onClick={lastPage}>Last</button>
        </div>
      </div>
    );
  } else {
    return <CircularProgress size={100} />;
  }
};

export default ImagesList;
