import './FavouriteBtn.scss';

import React from 'react';

interface FavouriteBtnProps {
    isActive: boolean;
    onClick?: () => void;
}

// selectedCoins.includes(record.key)

const FavouriteBtn = ({isActive, onClick}: FavouriteBtnProps) => {
    return (
        <button onClick={onClick} className={`favorites-btn ${isActive && 'active'}`}>
          {isActive ? 
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.5 10.4479L10.517 13L9.451 8.19L13 4.95368L8.3265 4.53632L6.5 0L4.6735 4.53632L0 4.95368L3.549 8.19L2.483 13L6.5 10.4479Z" fill="black" fill-opacity="0.87"/>
          </svg>
          :
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 4.95368L8.3265 4.52947L6.5 0L4.6735 4.53632L0 4.95368L3.549 8.19L2.483 13L6.5 10.4479L10.517 13L9.4575 8.19L13 4.95368ZM6.5 9.16842L4.056 10.7216L4.706 7.79316L2.548 5.82263L5.395 5.56263L6.5 2.80526L7.6115 5.56947L10.4585 5.82947L8.3005 7.8L8.9505 10.7284L6.5 9.16842Z" fill="black" fill-opacity="0.87"/>
          </svg>
        }
        </button>
    );
};

export default FavouriteBtn;