import React from 'react';
import '../css/checkbox.css';

class Checkbox extends React.Component {
  handleClick = () => {
    this.props.onChange({
      target: {
        type: 'checkbox',
        name: this.props.name,
        checked: !this.props.checked,
      },
    });
  };

  render() {
    return (
      <div className="checkbox">
        <input
          type="checkbox"
          checked={this.props.checked}
          name={this.props.name}
          onChange={this.handleClick}
        />
        <label onClick={this.handleClick} />
      </div>
    );
  }
}

export default Checkbox;
