import React from 'react';
import OptionButton from './OptionButton';
import '../css/addTaskGroup.css';

class AddTaskGroup extends React.Component {
  state = {
    name: '',
    isOpen: false,
    isHover: false,
  };

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.addTaskGroup(this.state.name);

    this.setState({ name: '', isOpen: false });
  };

  render() {
    const { color } = this.props;
    return (
      <React.Fragment>
        {this.state.isOpen && (
          <div className="add-task-group">
            <form onSubmit={this.handleSubmit}>
              <input
                placeholder="New Task Group"
                className="add-task-group__input"
                type="text"
                name="name"
                value={this.state.name}
                autoFocus
                onBlur={() => this.setState({ isOpen: false })}
                onChange={this.handleChange}
              />
            </form>
          </div>
        )}

        <div className="add-task-group__button-wrapper">
          <OptionButton
            bgColor={color}
            label="+"
            helpText="Add Task Group"
            onClick={() => this.setState({ isOpen: true })}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default AddTaskGroup;
