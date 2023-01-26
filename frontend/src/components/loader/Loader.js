import React from 'react';
import './Loader.scss';
import loaderImage from '../../assets/loader.gif';
import ReactDOM from 'react-dom';

const Loader = () => {
  return ReactDOM.createPortal(
    <div className='wrapper'>
      <div className='loader'>
        <img src={loaderImage} alt='Loading...' />
      </div>
    </div>,
    document.getElementById('loader')
  );
};

export const SpinnerImg = () => {
  return (
    <div className='--center-all'>
      <img src={loaderImage} alt='Loading...' />
    </div>
  );
};

export default Loader;
