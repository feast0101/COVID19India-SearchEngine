import React from 'react';
import './Loader.scss';
import LoaderImg from "./../../../assets/images/loader.gif";

const Loader = (props) => {
  const loaderClassName = props.isLoading ? 'in' : 'out';
  return (
    <div className={`loader-container ${loaderClassName}`}>
      <div className='loader'>
        <span/>
        <span/>
        <span/>
        <span/>
      </div>
    </div>);
};


export default Loader;