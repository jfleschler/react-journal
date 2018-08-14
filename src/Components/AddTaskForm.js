import React from 'react';
import uuid from 'uuid';

import ClickOutside from './ClickOutside';

class AddTaskForm extends React.Component {
  state = {
    editing: false,
    text: '',
  };

  handleChange = event => {
    this.setState({
      text: event.target.value,
    });
  };

  addTask = () => {
    if (this.state.text !== '') {
      const newTask = {
        id: uuid.v4(),
        text: this.state.text,
        timestamp: Date.now(),
        complete: false,
      };
      this.props.addTask(newTask);
    }

    this.setState({ text: '', editing: false });
  };

  render() {
    return (
      <ClickOutside
        onClickOutside={() => {
          this.setState({ editing: false });
        }}>
        <div className="add-task">
          {this.state.editing || (
            <span
              className="text"
              onClick={e => {
                e.nativeEvent.stopImmediatePropagation();
                this.setState({ editing: true });
              }}>
              add a new task ...
            </span>
          )}

          {this.state.editing && (
            <React.Fragment>
              <input
                type="text"
                name="text"
                value={this.state.text}
                autoFocus
                onChange={this.handleChange}
              />
              <button onClick={this.addTask}>Add</button>
            </React.Fragment>
          )}
        </div>
      </ClickOutside>
    );
  }
}

export default AddTaskForm;
