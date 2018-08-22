import React from 'react';
import Task from './Task';

const TaskList = ({
  title,
  color,
  tasks,
  editTask,
  onUpdateTask,
  tasksById,
}) => (
  <div className="task-list">
    {tasks.map((task, index) => (
      <Task
        key={task}
        task={tasksById[task]}
        index={index}
        editTask={editTask}
        onUpdateTask={onUpdateTask}
      />
    ))}
  </div>
);

export default TaskList;
