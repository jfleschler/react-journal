import React from 'react';
import Task from './Task';

const TaskList = ({ date, tasks, updateTask }) => (
  <div className="task-list">
    {tasks.map((task, index) => (
      <Task
        key={task.id}
        date={date}
        index={index}
        task={task}
        updateTask={updateTask}
      />
    ))}
  </div>
);

export default TaskList;
