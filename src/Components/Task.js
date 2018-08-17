import React from 'react';
import moment from 'moment';
import classnames from 'classnames';

import Checkbox from './Checkbox';
import ClickOutside from './ClickOutside';
import '../css/task.css';

class Task extends React.Component {
  state = {
    selected: false,
  };

  handleChange = event => {
    this.setState({ selected: false });

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    const updatedTask = {
      ...this.props.task,
      [target.name]: value,
    };
    this.props.saveTask(this.props.title, updatedTask);
  };

  render() {
    const { complete, text, timestamp } = this.props.task;
    const { color } = this.props;
    const taskTime = moment(timestamp).format('h:mm a');

    return (
      <ClickOutside onClickOutside={() => this.setState({ selected: false })}>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .checkbox label:after {
                border-right: 1px solid ${color};
                border-top: 1px solid ${color};
              }
              .task--selected {
                  background: ${color};
                  box-shadow: 0px 1px 3px ${color};
              }`,
          }}
        />

        <div
          className={classnames('task', {
            'task--selected': this.state.selected,
          })}>
          <Checkbox
            name="complete"
            checked={complete}
            onChange={this.handleChange}
          />

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
        </div>
      </ClickOutside>
    );
  }
}

export default Task;
