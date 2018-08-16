import React from 'react';
import moment from 'moment';
import classnames from 'classnames';

import Checkbox from './Checkbox';
import ClickOutside from './ClickOutside';
import '../css/task.css';

class Task extends React.Component {
  state = {
    selected: false,
    editing: false,
  };

  handleChange = event => {
    this.setState({ selected: false });

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    const updatedTask = {
      ...this.props.task,
      [target.name]: value,
    };
    this.props.saveTask(this.props.date, updatedTask);
  };

  handleClick = event => {};

  render() {
    const { complete, text, timestamp } = this.props.task;
    const { date } = this.props;
    const today = moment().format('MM.DD.YY');
    const taskTime =
      today === date
        ? moment(timestamp).fromNow()
        : moment(timestamp).format('h:mm a');

    return (
      <ClickOutside onClickOutside={() => this.setState({ selected: false })}>
        <div
          className={classnames('task', {
            'task--selected': this.state.selected,
          })}>
          <Checkbox
            name="complete"
            checked={complete}
            onChange={this.handleChange}
          />

          {this.state.editing || (
            <div
              className={classnames('task__body', {
                'task__body--complete': complete,
              })}
              onClick={() => this.setState({ selected: !this.state.selected })}>
              <span className="task__text">{text}</span>
              <span className="task__date">{taskTime}</span>
              <span className="task__actions">
                <button onClick={() => this.props.editTask(this.props.task)}>
                  <i className="fas fa-pen" />
                </button>
              </span>
            </div>
          )}

          {this.state.editing && (
            <input
              className="task__input"
              type="text"
              name="text"
              value={text}
              autoFocus
              onBlur={() => this.setState({ editing: false })}
              onChange={this.handleChange}
            />
          )}
        </div>
      </ClickOutside>
    );
  }
}

export default Task;
