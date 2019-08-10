import React from 'react';
import { Link } from 'react-router-dom';

const ImagesList = ({ images }) => {
  const imagesData = images.filter(item => (item.image ? true : false));

  console.log(imagesData);
  console.log(images);

  const listOfImages = imagesData.map((tile, index) => {
    const colors = ['#57C6EF', '#F279D6', '#F6FE87', '#EA87FE'];
    const chosenColor = colors[Math.floor(Math.random() * colors.length)];
    return (
      <div key={index}>
        <Link to={`/images/${tile.id}`}>
          <div>
            <img
              src={tile.image}
              alt={tile.title}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                borderRadius: '8px',
                border: `4px solid ${chosenColor}`
              }}
            />
          </div>
        </Link>
      </div>
    );
  });

  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
      <div
        style={{
          display: 'grid',
          width: '80%',
          heigh: '100%',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gridTemplateRows: 'fitContent(5%)',
          gridGap: '2%',
          gridAutoFlow: 'dense',
          alignItems: 'center'
        }}
      >
        {listOfImages.reverse()}
      </div>
    </div>
  );
};

export default ImagesList;







useEffect(() => {
  if (items.length) {
    console.log('itemsInLoop: ', items);
    const checkboxState = [];
    items.forEach(item => {
      checkboxState.push({ [item.id]: false });
    });
    setState(checkboxState);
  }
}, [items]);


const colors = ['#57C6EF', '#F279D6', '#F6FE87', '#EA87FE'];
const chosenColor = colors[Math.floor(Math.random() * colors.length)];




const firstPageList = imagesData.slice(0, 15);
const firstList = firstPageList.map((tile, index) => {
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
setCurrentList(firstList);



const ImagesList = ({ imagesData }) => {
  const [pageList, setPageList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [leftButton, setLeftButton] = useState(1);
  const [centerButton, setCenterButton] = useState(1);
  const [rightButton, setRightButton] = useState(1);
  const [currentList, setCurrentList] = useState([]);
  const numberPerPage = 14;
  let listOfImages = [];

  useEffect(() => {
    console.log('useEffect triggered');
    const totalPages = Math.ceil(imagesData.length / numberPerPage);
    setNumberOfPages(totalPages);
    loadList();
  }, [imagesData]);

  function loadList() {
    console.log('loadList triggered');
    const begin = (currentPage - 1) * numberPerPage;
    let end;
    if (begin + numberPerPage <= imagesData.length) {
      end = begin + numberPerPage;
    } else {
      end = imagesData.length - begin;
    }
    const pageListCut = imagesData.slice(begin, end);
    drawList(pageListCut);
    if (currentPage === 1 || (currentPage === 2) & (numberOfPages > 3)) {
      setRightButton(3);
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
  };

  const firstPage = () => {
    setCurrentPage(1);
    loadList();
  };
  const previousPage = () => {
    setCurrentPage(currentPage - 1);
    loadList();
  };
  const centerButtonPage = () => {
    setCurrentPage(2);
    loadList();
  };
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    loadList();
  };
  const lastPage = () => {
    setCurrentPage(numberOfPages);
    loadList();
  };

  console.log(currentList);
  console.log(imagesData);
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
              {currentList.reverse()}
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










import React from 'react';
import { Link } from 'react-router-dom';
import './ImagesList.css';

const ImagesList = ({ imagesData }) => {
  console.log(imagesData);

  const listOfImages = imagesData.map((tile, index) => {
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

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <div style={{ display: 'flex', width: '90%', justifyContent: 'center' }}>
        <div className={imagesData.length > 12 ? 'flexbox' : 'flexbox2'}>
          {listOfImages.reverse()}
        </div>
      </div>
    </div>
  );
};

export default ImagesList;