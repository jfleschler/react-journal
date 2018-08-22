import uuid from 'uuid';

function addJournal(journalName, journalColor) {
  const journalId = uuid.v4();
  return {
    type: 'ADD_JOURNAL',
    payload: {
      journalId,
      journalName,
      journalColor,
    },
  };
}
function updateJournal(journalId, journalName, journalColor) {
  return {
    type: 'UPDATE_JOURNAL',
    payload: {
      journalId,
      journalName,
      journalColor,
    },
  };
}

function deleteJournal(journalId) {
  return {
    type: 'DELETE_JOURNAL',
    payload: { journalId },
  };
}

function addTopic(journalId, topicName) {
  const topicId = uuid.v4();
  return {
    type: 'ADD_TOPIC',
    payload: {
      topicId,
      journalId,
      topicName,
    },
  };
}
function deleteTopic(topicId, journalId) {
  return {
    type: 'DELETE_TOPIC',
    payload: { topicId, journalId },
  };
}

function addTaskGroup(topicId, taskGroupName) {
  const taskGroupId = uuid.v4();
  return {
    type: 'ADD_TASK_GROUP',
    payload: {
      taskGroupId,
      topicId,
      taskGroupName,
    },
  };
}
function updateTaskGroup(taskGroupId, taskGroupName) {
  return {
    type: 'UPDATE_TASK_GROUP',
    payload: {
      taskGroupId,
      taskGroupName,
    },
  };
}
function deleteTaskGroup(taskGroupId, topicId) {
  return {
    type: 'DELETE_TASK_GROUP',
    payload: { taskGroupId, topicId },
  };
}

function addTask(taskGroupId, taskText) {
  const taskId = uuid.v4();
  return {
    type: 'ADD_TASK',
    payload: {
      taskId,
      taskGroupId,
      taskText,
      taskComplete: false,
      taskTimestamp: new Date(),
    },
  };
}

function updateTask(taskId, taskText, taskComplete) {
  return {
    type: 'UPDATE_TASK',
    payload: {
      taskId,
      taskText,
      taskComplete,
    },
  };
}
function deleteTask(taskId) {
  return {
    type: 'DELETE_TASK',
    payload: { taskId },
  };
}

function openTopic(topicId) {
  return {
    type: 'OPEN_TOPIC',
    payload: { topicId },
  };
}

export {
  addJournal,
  updateJournal,
  deleteJournal,
  addTopic,
  deleteTopic,
  addTaskGroup,
  updateTaskGroup,
  deleteTaskGroup,
  addTask,
  updateTask,
  deleteTask,
  openTopic,
};
