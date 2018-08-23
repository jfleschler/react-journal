import React from 'react';
import moment from 'moment';
import classnames from 'classnames';
import styled, { css } from 'styled-components';

import Checkbox from './Checkbox';
import ClickOutside from './ClickOutside';
import '../css/task.css';

const TaskWrapper = styled.div`
  ${props =>
    props.isActive &&
    css`
      color: white;
      background: ${props.color};
      box-shadow: 0px 1px 3px ${props.color};
    `};
`;

class Task extends React.Component {
  state = {
    selected: false,
    editing: false,
    text: '',
  };

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      text: props.task.text,
    };
  }

  handleChange = event => {
    this.setState({
      text: event.target.value,
    });
  };

  handleToggle = event => {
    this.setState({ selected: false });

    const { id, text } = this.props.task;
    this.props.onUpdateTask(id, text, event.target.checked);
  };

  handleSubmit = event => {
    event.preventDefault();
    const { id, complete } = this.props.task;
    this.props.onUpdateTask(id, this.state.text, complete);

    this.setState({
      editing: false,
    });
  };

  renderTask = () => {
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
            .task--editing {
                background: ${color};
                box-shadow: 0px 1px 3px ${color};
            }`,
          }}
        />
        <TaskWrapper
          color={color}
          isActive={this.state.selected}
          className={classnames('task', {
            'task--selected': this.state.selected,
          })}>
          <Checkbox
            name="complete"
            checked={complete}
            onChange={this.handleToggle}
          />

          <div
            className={classnames('task__body', {
              'task__body--complete': complete,
            })}
            onClick={() => this.setState({ selected: !this.state.selected })}>
            <span className="task__text">{text}</span>
            <span className="task__date">{taskTime}</span>
            <span className="task__actions">
              <button onClick={() => this.setState({ editing: true })}>
                <i className="fas fa-pen" />
              </button>
            </span>
          </div>
        </TaskWrapper>
      </ClickOutside>
    );
  };

  renderEditTask = () => {
    return (
      <TaskWrapper isActive={true} className="task task--editing">
        <div />
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Task description"
            className="task__input"
            type="text"
            name="text"
            value={this.state.text}
            autoFocus
            onBlur={() =>
              this.setState({ editing: false, text: this.props.task.text })
            }
            onChange={this.handleChange}
          />
        </form>
      </TaskWrapper>
    );
  };

  render() {
    if (!this.state.editing) {
      return this.renderTask();
    } else {
      return this.renderEditTask();
    }
  }
}

export default Task;
