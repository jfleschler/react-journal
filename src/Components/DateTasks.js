import React from 'react';
import TaskList from './TaskList';

const DateTasks = ({ tasks, updateTask }) => (
  <div className="task-list">
    {Object.keys(tasks).map(key => (
      <div key={key} className="task-date">
        <h1>{key}</h1>
        <TaskList date={key} tasks={tasks[key]} updateTask={updateTask} />
      </div>
    ))}
  </div>
);

export default DateTasks;
