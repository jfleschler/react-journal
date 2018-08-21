import uuid from 'uuid';
import { tasksRef } from '../demo-data';
import * as Helpers from './helpers';

function toggleTask(taskId) {
  const task = Helpers.findById(tasksRef, taskId);
  return Helpers.updateById(tasksRef, taskId, { complete: !task.complete });
}

function createTask(taskGroupId, text) {
  return Helpers.findByAttribute(tasksRef, 'taskGroupId', taskGroupId).then(
    tasks => {
      const order = tasks.length;
      const newTask = {
        text: text,
        taskGroupId: taskGroupId,
        complete: false,
        timestamp: new Date(),
        order,
      };

      return new Promise(resolve => {
        const task = tasksRef.push(newTask, () => {
          resolve(Object.assign({ id: task.key }, newTask));
        });
      });
    }
  );
}

function readTask(taskId) {
  return Helpers.findById(tasksRef, taskId);
}

function updateTask(taskId, text) {
  return Helpers.updateById(tasksRef, taskId, { text });
}

function deleteTask(taskId) {
  return Helpers.removeById(tasksRef, taskId);
}

export { toggleTask, createTask, readTask, updateTask, deleteTask };
