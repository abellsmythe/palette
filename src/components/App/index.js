import React, { Component } from 'react';
import Color from 'color';

import {
  ColorBlock,
  DynamicInput,
  Slider,
} from '../';

import { 
  // URI
  getURI,
  setURI,
  // Colors
  hexToNumber,
  isValidHex,
  numberToHex, 
} from '../helper';

import './style.css';

const errorColor    = 'transparent';
const initialColor  = '1D9A6C';

const initialState = {
  // Colors Amount
  darkColorsAmount: 8,
  lightColorsAmount: 8,
  // Amount
  darkestAmount: 50,
  lightestAmount: 50,
  // Mix Rotate
  darkColorsMixRotate: 0,
  lightColorsMixRotate: 0,
  // Saturation
  darkSaturation: 20,
  lightSaturation: 20,
  // Main Color
  mainColor: initialColor,
  r: Color(numberToHex(initialColor)).rgb().red(),
  g: Color(numberToHex(initialColor)).rgb().green(),
  b: Color(numberToHex(initialColor)).rgb().blue()
};

class App extends Component {
  constructor (props) {
    super(props);

    this.state = this.getHash() || initialState;
  }

  componentDidUpdate () {
    this.updateHash();
  }

  updateHash = () => setURI(window, this.state);

  getHash = () => getURI(window, initialState);

  handleMainColorChange = (e) => {
    const baseColor =  e.target.value;
    const mainColor =  baseColor[0] === '#' ? baseColor.substr(1, baseColor.length) : baseColor;

    this.setState({
      mainColor
    }, () => {
      this.updateRGBWithMainColor();
    });
  }
  
  handleMainColorBlur = (e) => {
    if (!e.target.value) {
      this.setState({
        mainColor: 666
      });
    }
  }

  // Dark Amount Change

  handleDarkColorsAmountChange = (e) => {
    this.setState({
      darkColorsAmount: e.target.value
    });
  }

  handleDarkestAmountChange = (e) => {
    this.setState({
      darkestAmount: e.target.value
    });
  }

  // Light Amount Change

  handleLightColorsAmountChange = (e) => {
    this.setState({
      lightColorsAmount: e.target.value
    });
  }

  handleLightestAmountChange = (e) => {
    this.setState({
      lightestAmount: e.target.value
    });
  }

  // Dark Mix Rotate

  handleDarkColorsMixRotate = (e) => {
    this.setState({
      darkColorsMixRotate: e.target.value
    });
  }

  // Light Mix Rotate

  handleLightColorsMixRotate = (e) => {
    this.setState({
      lightColorsMixRotate: e.target.value
    });
  }

  // Dark Amount Blur

  handleDarkColorsAmountBlur = (e) => {
    if (!e.target.value) {
      this.setState({
        darkColorsAmount: 0
      });
    }
  }

  handleDarkestAmountBlur = (e) => {
    if (!e.target.value) {
      this.setState({
        darkestAmount: 0
      });
    }
  }

  // Light Amount Blur

  handleLightColorsAmountBlur = (e) => {
    if (!e.target.value) {
      this.setState({
        lightColorsAmount: 0
      });
    }
  }

  handleLightestAmountBlur = (e) => {
    if (!e.target.value) {
      this.setState({
        lightestAmount: 0
      });
    }
  }

  // Dark Mix Rotate Blur
  
  handleDarkColorsMixRotateBlur = (e) => {
    if (!e.target.value) {
      this.setState({
        darkColorsMixRotate: 0
      });
    }
  }

  // Light Mix Rotate Blur

  handleLightColorsMixRotateBlur = (e) => {
    if (!e.target.value) {
      this.setState({
        lightColorsMixRotate: 0
      });
    }
  }

  // Dark Saturation Blur

  handleDarkSaturationBlur = (e) => {
    if (!e.target.value) {
      this.setState({
        darkSaturation: 0
      });
    }
  }

  // Ligth Saturation Blur

  handleLightSaturationBlur = (e) => {
    if (!e.target.value) {
      this.setState({
        lightSaturation: 0
      });
    }
  }
  
  // Dark Saturation Change
  
  handleDarkSaturationChange = (e) => {
    this.setState({
      darkSaturation: e.target.value
    });
  }

  // Light Saturation Change

  handleLightSaturationChange = (e) => {
    this.setState({
      lightSaturation: e.target.value
    });;
  }

  updateMainColorWithRGB = () => {
    this.setState({
      mainColor: hexToNumber(Color(`rgb(${this.state.r}, ${this.state.g}, ${this.state.b})`).hex())
    });
  }

  updateRGBWithMainColor = () => {
    if (isValidHex(numberToHex(this.state.mainColor))) {
      this.setState({
        r: Color(numberToHex(this.state.mainColor)).rgb().red(),
        g: Color(numberToHex(this.state.mainColor)).rgb().green(),
        b: Color(numberToHex(this.state.mainColor)).rgb().blue()
      });
    }
  }

  handleRGBChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      this.updateMainColorWithRGB()
    });
  }

  getColorsList (colorsAmount, colorsShiftAmount, mixColor, rotate, saturation) {
    const colorsList = []
    const givenColor = isValidHex(numberToHex(this.state.mainColor)) ? numberToHex(this.state.mainColor) : errorColor

    let step
    for (step = 0; step < colorsAmount; step++) {
      if (isValidHex(numberToHex(this.state.mainColor))) {
        colorsList.push(Color(givenColor).rotate((step + 1) / colorsAmount * -rotate).saturate((step + 1) / colorsAmount * (saturation / 100)).mix(Color(mixColor), (colorsShiftAmount / 100) * (step + 1) / colorsAmount).string())
      } else {
        colorsList.push(errorColor)
      }
    }

    return colorsList
  }

  render () {

    const givenColor = isValidHex(this.state.mainColor) ? `#${this.state.mainColor}` : errorColor;

    return (
      <main 
        style={{
          color: Color(givenColor).mix(Color('black'), 0.3).string()
        }}
      >
        <div
          className={'title'}
        >
          <h1>
            Palette Generator
          </h1>
        </div>
        <section 
          className={'container'}
        >
          <div
            className={'content'}
          >
            <div
              className={'row'}
            >
              <div
                className={'item wide'} 
              >
                <DynamicInput 
                  color={numberToHex(this.state.mainColor)} 
                  prefix={'#'}
                  value={this.state.mainColor} 
                  onChange={this.handleMainColorChange} 
                  onBlur={this.handleMainColorBlur}
                />
                <Slider 
                  name={'r'} 
                  label={'r'}
                  min={0} 
                  max={255} 
                  color={numberToHex(this.state.mainColor)} 
                  value={this.state.r} 
                  onChange={this.handleRGBChange} 
                />
                <Slider  
                  name={'g'}
                  label={'g'}
                  min={0} 
                  max={255} 
                  color={numberToHex(this.state.mainColor)} 
                  value={this.state.g} 
                  onChange={this.handleRGBChange} 
                />
                <Slider  
                  name={'b'}
                  label={'b'}
                  min={0} 
                  max={255} 
                  color={numberToHex(this.state.mainColor)} 
                  value={this.state.b} 
                  onChange={this.handleRGBChange} 
                />
              </div>
              <div
                className={'separator'}
                style={{
                  background: isValidHex(numberToHex(this.state.mainColor)) ? Color(numberToHex(this.state.mainColor)).mix(Color('black'), 0.3).fade(0.85).string() : '#ddd'
                }}
              />
              <div
                className={'item'}
              >
                <DynamicInput 
                  type='number' 
                  min={0} 
                  label={'Dark colors amount'}
                  value={this.state.darkColorsAmount} 
                  color={numberToHex(this.state.mainColor)} 
                  onChange={this.handleDarkColorsAmountChange} 
                  onBlur={this.handleDarkColorsAmountBlur} 
                />
              </div>
              <div
                className={'item'}
              >
                <DynamicInput 
                  type='number' 
                  min={0} 
                  max={99}
                  sufix='%' 
                  label={'Darkness'}
                  color={numberToHex(this.state.mainColor)} 
                  value={this.state.darkestAmount} 
                  onChange={this.handleDarkestAmountChange}  
                  onBlur={this.handleDarkestAmountBlur} 
                  withSlider 
                />
              </div>
              <div
                className={'item'}
              >
                <DynamicInput 
                  type='number' 
                  min={-360} 
                  max={360} 
                  sufix='°' 
                  label={'Dark colors hue angle'} 
                  color={numberToHex(this.state.mainColor)} 
                  value={this.state.darkColorsMixRotate} 
                  onChange={this.handleDarkColorsMixRotate} 
                  onBlur={this.handleDarkColorsMixRotateBlur} 
                  withSlider 
                />
              </div>
              <div
                className={'item'}
              >
                <DynamicInput
                  type='number'  
                  min={-100} 
                  max={100} 
                  sufix='%' 
                  label={'Dark colors saturation'} 
                  color={numberToHex(this.state.mainColor)} 
                  value={this.state.darkSaturation} 
                  onChange={this.handleDarkSaturationChange} 
                  onBlur={this.handleDarkSaturationBlur} 
                  withSlider 
                />
              </div>
              <div
                className={'separator'}
                style={{
                  background: isValidHex(numberToHex(this.state.mainColor)) ? Color(numberToHex(this.state.mainColor)).mix(Color('black'), 0.3).fade(0.85).string() : '#ddd'
                }}
              />
              <div
                className={'item'}
              >
                <DynamicInput 
                  type='number'
                  min={0} 
                  label={'Light colors amount'} 
                  color={numberToHex(this.state.mainColor)} 
                  value={this.state.lightColorsAmount} 
                  onChange={this.handleLightColorsAmountChange} 
                  onBlur={this.handleLightColorsAmountBlur} 
                />
              </div>
              <div
                className={'item'}
              >
                <DynamicInput 
                  type='number' 
                  min={0} 
                  max={99} 
                  sufix='%'
                  label={'Lightness'}
                  color={numberToHex(this.state.mainColor)} 
                  value={this.state.lightestAmount} 
                  onChange={this.handleLightestAmountChange} 
                  onBlur={this.handleLightestAmountBlur} 
                  withSlider 
                />
              </div>
              <div
                className={'item'}
              >
                <DynamicInput 
                  type='number'
                  min={-360} 
                  max={360}  
                  sufix='°' 
                  label={'Light colors hue angle'} 
                  color={numberToHex(this.state.mainColor)} 
                  value={this.state.lightColorsMixRotate} 
                  onChange={this.handleLightColorsMixRotate} 
                  onBlur={this.handleLightColorsMixRotateBlur} 
                  withSlider 
                />
              </div>
              <div
                className={'item'}
              >
                <DynamicInput 
                  type='number'
                  min={-100} 
                  max={100}  
                  sufix='%' 
                  label={'Light colors saturation'} 
                  color={numberToHex(this.state.mainColor)} 
                  value={this.state.lightSaturation} 
                  onChange={this.handleLightSaturationChange} 
                  onBlur={this.handleLightSaturationBlur} 
                  withSlider 
                />
              </div>
            </div>
            <div
              className={'colors__block'}
            >
              {
                this.getColorsList(this.state.darkColorsAmount, this.state.darkestAmount, 'black', this.state.darkColorsMixRotate, this.state.darkSaturation).reverse().map((color, index) => (
                  <ColorBlock 
                    key={index} 
                    style={{ background: color }} 
                    color={color} 
                    hasValidColor={isValidHex(numberToHex(this.state.mainColor))} 
                  />
                ))
              }
              {
                this.getColorsList(this.state.lightColorsAmount, this.state.lightestAmount, 'white', this.state.lightColorsMixRotate, this.state.lightSaturation).map((color, index) => (
                  <ColorBlock 
                    key={index}
                    style={{ background: color }} 
                    color={color}
                    hasValidColor={isValidHex(numberToHex(this.state.mainColor))}
                  />
                ))
              }
            </div>
          </div>
        </section>
        <footer>
          made by 
          &nbsp;
          <a 
            href='https://abellsmythe.me' 
            target='_blank' 
            rel='noopener noreferrer'
          >
            Alton Bell Smythe
          </a>
        </footer>
      </main>
    )
  }
}

export default App;