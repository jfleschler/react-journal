import React from 'react';
import TaskList from './TaskList';

class DateCard extends React.Component {
  render() {
    const { date, tasks } = this.props;
    const completedTasks = tasks.filter(task => task.complete).length;

    return (
      <div className="date-card">
        <h2>{date}</h2>
        <div className="date-card__counts">
          {completedTasks} / {tasks.length}
        </div>
        <TaskList {...this.props} />
      </div>
    );
  }
}

export default DateCard;
