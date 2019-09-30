import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const SlidePictures = ({ imagesData }) => {
  if (imagesData.length) {
    const reversedImages = imagesData.reverse();
    const images = [];
    for (let i = 0; i <= 3; i++) {
      images.push(reversedImages[i]);
    }

    const imagesList = images.map((tile, index) => {
      return (
        <div style={{ margin: '10px' }}>
          <img
            src={tile.image}
            alt={tile.title}
            key={tile.id}
            style={{ maxHeight: '100%', maxWidth: '100%' }}
          />
          <h3 style={{ textAlign: 'center' }}>{tile.title}</h3>
        </div>
      );
    });
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            width: '90%',
            height: '350px'
          }}
        >
          {imagesList}
        </div>
      </div>
    );
  } else {
    return <CircularProgress size={100} />;
  }
};
export default SlidePictures;
