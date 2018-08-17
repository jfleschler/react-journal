import React from 'react';
import classnames from 'classnames';
import styled, { css } from 'styled-components';

import ClickOutside from './ClickOutside';
import '../css/optionButton.css';

const Button = styled.button`
  background: ${props => props.bgColor}80;
  color: ${props => props.color || 'white'};

  ${props => {
    props.isHover &&
      css`
        background: ${props => props.bgColor}A0;
      `;
  }};
`;

const HelpText = styled.div`
  color: ${props => props.color || 'white'};
  background: ${props => props.bgColor}A0;
`;

const ButtonOptions = styled.div`
  color: ${props => props.color || 'white'};
  background: ${props => props.bgColor}A0;

  &:after {
    border-bottom: 8px solid ${props => props.bgColor}A0;
  }
`;

class OptionButton extends React.Component {
  state = {
    isHover: false,
    isOpen: false,
  };

  handleClick = () => {
    this.props.onClick();

    if (this.props.children) {
      this.setState({ isOpen: true });
    }
  };

  render() {
    return (
      <div className="option-button__wrapper">
        <Button
          color={this.props.color}
          bgColor={this.props.bgColor}
          isHover={this.state.isHover}
          className="option-button__button"
          onClick={this.handleClick}
          onMouseEnter={() => this.setState({ isHover: true })}
          onMouseOut={() => this.setState({ isHover: false })}>
          {this.props.label || null}
          {this.props.render && this.props.render()}
        </Button>
        {this.props.helpText && (
          <HelpText
            color={this.props.color}
            bgColor={this.props.bgColor}
            className={classnames('option-button__help-text', {
              'option-button__help-text--hover': this.state.isHover,
            })}>
            {this.props.helpText}
          </HelpText>
        )}
        {this.state.isOpen && (
          <ClickOutside onClickOutside={() => this.setState({ isOpen: false })}>
            <div>
              <ButtonOptions
                color={this.props.color}
                bgColor={this.props.bgColor}
                className="option-button__options">
                {this.props.children}
              </ButtonOptions>
            </div>
          </ClickOutside>
        )}
      </div>
    );
  }
}
export default OptionButton;
