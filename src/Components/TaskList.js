import React from 'react';
import Task from './Task';

const TaskList = ({ title, color, tasks, editTask, saveTask }) => (
  <div className="task-list">
    {tasks.map((task, index) => (
      <Task
        key={task}
        color={color}
        title={title}
        index={index}
        task={task}
        editTask={editTask}
        saveTask={saveTask}
      />
    ))}
  </div>
);

export default TaskList;
