import React from 'react';
import moment from 'moment';

class Task extends React.Component {
  state = {
    focused: false,
  };

  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    const updatedTask = {
      ...this.props.task,
      [target.name]: value,
    };
    this.props.updateTask(this.props.date, this.props.index, updatedTask);
  };

  render() {
    const { complete, text, timestamp } = this.props.task;
    const { date } = this.props;
    const today = moment().format('MM.DD.YY');

    console.log(date, today);
    const taskTime =
      today === date
        ? moment(timestamp).fromNow()
        : moment(timestamp).format('h:mm a');
    return (
      <div className="task">
        <input
          className="task__checkbox"
          type="checkbox"
          name="complete"
          checked={complete}
          onChange={this.handleChange}
        />

        {this.state.focused || (
          <div
            className={complete ? 'task__text--complete' : 'task__text'}
            onClick={() => {
              this.setState({ focused: true });
            }}>
            {text}
            <span className="task__date">{taskTime}</span>
          </div>
        )}

        {this.state.focused && (
          <input
            className="task__input"
            type="text"
            name="text"
            value={text}
            autoFocus
            onBlur={() => this.setState({ focused: false })}
            onChange={this.handleChange}
          />
        )}
      </div>
    );
  }
}

export default Task;
