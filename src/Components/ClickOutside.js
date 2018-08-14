import React from 'react';

class ClickOutside extends React.Component {
  containerRef = React.createRef();

  componentDidMount() {
    document.addEventListener('click', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  }

  handleClick = event => {
    if (
      !!this.containerRef.current &&
      !this.containerRef.current.contains(event.target)
    ) {
      this.props.onClickOutside();
    }
  };

  render() {
    return (
      <React.Fragment>
        {React.Children.map(this.props.children, child =>
          React.cloneElement(child, {
            ref: this.containerRef,
          })
        )}
      </React.Fragment>
    );
  }
}

export default ClickOutside;
