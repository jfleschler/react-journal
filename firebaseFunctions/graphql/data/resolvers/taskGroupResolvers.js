import uuid from 'uuid';
import { taskGroupsRef } from '../demo-data';
import * as Helpers from './helpers';

function createTaskGroup(topicId, name) {
  return Helpers.findByAttribute(taskGroupsRef, 'topicId', topicId).then(
    taskGroups => {
      const order = taskGroups.length;
      const newTaskGroup = {
        topicId,
        name,
        order,
      };

      return new Promise(resolve => {
        const taskGroup = taskGroupsRef.push(newTaskGroup, () => {
          resolve(Object.assign({ id: taskGroup.key }, newTaskGroup));
        });
      });
    }
  );
}

function readTaskGroup(taskGroupId) {
  return Helpers.findById(taskGroupsRef, taskGroupId);
}

function updateTaskGroup(taskGroupId, name) {
  return Helpers.updateById(taskGroupsRef, taskGroupId, { name });
}

function deleteTaskGroup(taskGroupId) {
  return Helpers.removeById(taskGroupsRef, taskGroupId);
}

export { createTaskGroup, readTaskGroup, updateTaskGroup, deleteTaskGroup };
