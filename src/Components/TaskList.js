import React from 'react';
import Task from './Task';

const TaskList = ({ date, tasks, editTask, saveTask }) => (
  <div className="task-list">
    {tasks.map((task, index) => (
      <Task
        key={task.id}
        date={date}
        index={index}
        task={task}
        editTask={editTask}
        saveTask={saveTask}
      />
    ))}
  </div>
);

export default TaskList;
