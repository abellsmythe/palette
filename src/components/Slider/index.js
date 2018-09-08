import React from 'react';

import './style.css';

const Slider = ({ label, className, children, ...rest }) => {
  return (
    <div
      className={'slider__wrapper'}
    >
      {
        label && (
          <div
            className={'slider__label'}
          >
            { label }
          </div>
        )
      }
      <input
        type={'range'}
        className={`slider ${className}`}
        { ...rest }
      >
        { children }
      </input>
    </div>
  );
}

export default Slider;