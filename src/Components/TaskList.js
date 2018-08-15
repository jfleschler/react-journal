import React from 'react';
import Task from './Task';

const TaskList = ({ date, tasks, editTask }) => (
  <div className="task-list">
    {tasks.map((task, index) => (
      <Task
        key={task.id}
        date={date}
        index={index}
        task={task}
        editTask={editTask}
      />
    ))}
  </div>
);

export default TaskList;
