import React, { Component } from 'react';
import Color from 'color';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import './style.css';

class ColorBlock extends Component {
  constructor (props) {
    super(props)
    
    this.state = {
      copied: false
    };
  }

  handleCopied = () => {
    this.setState({
      copied: true
    }, () => {
      this.delayCopyFalseState();
    });
  }

  delayCopyFalseState = () => {
    setTimeout(() => {
      this.setState({
        copied: false
      })
    }, 800);
  }

  render () {
    const { wide, hasValidColor, color, ...rest } = this.props

    return (
      <CopyToClipboard 
        text={hasValidColor ? Color(color).hex() : null}
      >
        <div 
          className={`color__block__container ${wide ? 'wide' : ''} ${!hasValidColor ? 'invalid' : ''}`}
          onClick={this.handleCopied}
          {...rest}
        >
          <div 
            className={'color__block__code'}
          >
            { hasValidColor ? Color(color).hex() : null }
            {this.state.copied && (
              <div
                className={'copied__text'}
              >
                { Color(color).hex() }
              </div>
            )}
          </div>
        </div>
      </CopyToClipboard>
    )
  }
}

export default ColorBlock;