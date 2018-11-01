import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  color: ${props => (props.danger ? 'red' : '')};
`;

class ConfirmButton extends React.Component {
  state = {
    clicked: 0,
  };

  handleClick = () => {
    const timesClicked = this.state.clicked + 1;
    if (timesClicked > 1) {
      this.props.onConfirm();
      this.setState({ clicked: 0 });
    } else {
      this.setState({ clicked: timesClicked + 1 });
    }
  };

  render() {
    return (
      <Button
        danger={this.state.clicked !== 0}
        onClick={this.handleClick}
        className={this.props.classOverride}>
        {this.state.clicked === 0 && this.props.children}
        {this.state.clicked === 0 || 'Are you sure?'}
      </Button>
    );
  }
}
export default ConfirmButton;
