import React from 'react';
import moment from 'moment';
import classnames from 'classnames';

import ClickOutside from './ClickOutside';
import '../css/editTask.css';

class EditTaskForm extends React.Component {
  state = {
    text: '',
  };

  componentWillReceiveProps(props) {
    this.setState({ text: props.task.text });
  }

  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({ [target.name]: value });
  };

  handleSave = event => {
    event.preventDefault();

    const updatedTask = {
      ...this.props.task,
      text: this.state.text,
    };

    const taskGroup = Object.keys(this.props.topic.tasks).filter(key => {
      const tasks = this.props.topic.tasks[key];
      return tasks.filter(task => task.id === updatedTask.id).length;
    });

    this.props.saveTask(taskGroup, updatedTask);

    this.setState({ text: '' });
  };

  handleCancel = () => {
    this.props.cancelEdit();
  };

  render() {
    const isEditing = Object.keys(this.props.task).length !== 0;
    // if (Object.keys(this.props.task).length === 0) return null;

    return (
      <div
        className={classnames('edit-task', {
          'edit-task--active': isEditing,
        })}>
        <div className="edit-task__modal">
          <form className="edit-task__content" onSubmit={this.handleSave}>
            <input
              className="task__input"
              type="text"
              name="text"
              autoFocus
              value={this.state.text || ' '}
              onChange={this.handleChange}
            />
            <button type="submit">save</button>
          </form>
        </div>

        <div className="edit-task__overlay" onClick={this.handleCancel} />
      </div>
    );
  }
}

export default EditTaskForm;
