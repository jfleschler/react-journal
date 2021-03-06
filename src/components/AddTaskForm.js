import React from 'react';
import classnames from 'classnames';
import ClickOutside from './ClickOutside';
import '../css/addTaskForm.css';

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

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.text !== '') {
      this.props.onAddTask(this.props.taskGroupId, this.state.text);
    }

    this.setState({ text: '', editing: false });
  };

  render() {
    return (
      <ClickOutside
        onClickOutside={() => {
          this.setState({ editing: false });
        }}>
        <div
          className={classnames('add-task', {
            'add-task--editing': this.state.editing,
          })}
          onClick={e => {
            e.nativeEvent.stopImmediatePropagation();
            this.setState({ editing: true });
          }}>
          <div className="add-task__plus">+</div>

          {this.state.editing || <div className="text">Add task</div>}

          {this.state.editing && (
            <form onSubmit={this.handleSubmit}>
              <div className="task__body">
                <input
                  className="add-task__input"
                  type="text"
                  name="text"
                  value={this.state.text}
                  autoFocus
                  onChange={this.handleChange}
                />
              </div>
            </form>
          )}
        </div>
      </ClickOutside>
    );
  }
}

export default AddTaskForm;
