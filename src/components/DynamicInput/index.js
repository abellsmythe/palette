import React from 'react';

import { 
  Slider,
} from '../';

import './style.css';

const DynamicInput = ({ value, onChange, color, prefix, sufix, withSlider, withRgbSlider, label, min, max, ...rest }) => {
  return (
    <div
      className={'dynamic__input__container'}
    >
      {
        label && (
          <div
            className={'dynamic__input__label'}
          >
            { label }
          </div>
        )
      }
      <div
        className={'dynamic__input__root'}
      >
        <div
          className={'dynamic__input__wrapper'}
          color={color}
        >
          <input
            type={'text'}
            className={'dynamic__input__field isDisabled'} 
            color={color} 
            value={prefix} 
            readOnly 
            tabIndex={-1} 
          />
          <div
            className={'dynamic__input__value'}
          >
            {prefix}
          </div>
        </div>
        <div
          className={'dynamic__input__wrapper'}
          color={color}
        >
          <input
            type={'text'}
            className={'dynamic__input__field'} 
            min={min} 
            max={max} 
            color={color} 
            value={value} 
            onChange={onChange} 
            {...rest} 
          />
          <div
            className={'dynamic__input__value'}
          >
            {value}
          </div>
        </div>
        <div
          className={'dynamic__input__wrapper'}
          color={color}
        >
          <input
            type={'text'}
            className={'dynamic__input__field isDisabled'} 
            color={color} 
            value={sufix} 
            readOnly 
            tabIndex={-1} 
          />
          <div
            className={'dynamic__input__value'}
          >
            {sufix}
          </div>
        </div>
      </div>
      { 
        withSlider && (
          <Slider 
            min={min} 
            max={max} 
            color={color} 
            value={value}
            onChange={onChange}
          />
        )
      }
    </div>
  )
}

export default DynamicInput