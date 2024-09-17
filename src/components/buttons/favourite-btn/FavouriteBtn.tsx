import './FavouriteBtn.scss';

import React from 'react';

interface FavouriteBtnProps {
    onClick?: () => void;
}

const FavouriteBtn = ({onClick}: FavouriteBtnProps) => {
    return (
        <button onClick={onClick} className={`favorites-btn`}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.0009 18C4.0321 17.9945 0.00545668 13.9683 0 9.00001V8.82001C0.0989482 3.87409 4.17154 -0.0648231 9.11851 0.000808395C14.0655 0.0664399 18.0321 4.11201 17.9998 9.05881C17.9675 14.0056 13.9483 17.999 9.0009 18ZM4.50045 8.10001V9.90001H8.10081V13.5H9.90099V9.90001H13.5013V8.10001H9.90099V4.50001H8.10081V8.10001H4.50045Z" fill="black" fill-opacity="0.88"/>
          </svg>
        </button>
    );
};

export default FavouriteBtn;