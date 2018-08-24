import uuid from 'uuid';
import { writeToFirebase, pushToFirebase } from '../firebase';

function addJournal(journalName, journalColor) {
  const journalId = uuid.v4();

  writeToFirebase(
    `journals/${journalId}`,
    {
      id: journalId,
      name: journalName,
      color: journalColor,
      topics: [],
    },
    true
  );

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
  writeToFirebase(`journals/${journalId}`, {
    id: journalId,
    name: journalName,
    color: journalColor,
  });

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
  writeToFirebase(`journals/${journalId}`, null, true);
  return {
    type: 'DELETE_JOURNAL',
    payload: { journalId },
  };
}

function addTopic(journalId, topicName) {
  const topicId = uuid.v4();
  writeToFirebase(
    `topics/${topicId}`,
    {
      id: topicId,
      name: topicName,
    },
    true
  );
  writeToFirebase(`journals/${journalId}/topics/${topicId}`, topicId, true);

  return {
    type: 'ADD_TOPIC',
    payload: {
      topicId,
      journalId,
      topicName,
    },
  };
}

function updateTopic(topicId, topicName) {
  writeToFirebase(`topics/${topicId}`, {
    id: topicId,
    name: topicName,
  });
  return {
    type: 'UPDATE_TOPIC',
    payload: {
      topicId,
      topicName,
    },
  };
}

function deleteTopic(topicId, journalId) {
  writeToFirebase(`topics/${topicId}`, null, true);
  writeToFirebase(`journals/${journalId}/topics/${topicId}`, null, true);

  return {
    type: 'DELETE_TOPIC',
    payload: { topicId, journalId },
  };
}

function addTaskGroup(topicId, taskGroupName) {
  const taskGroupId = uuid.v4();
  writeToFirebase(
    `taskGroups/${taskGroupId}`,
    {
      id: taskGroupId,
      name: taskGroupName,
    },
    true
  );
  writeToFirebase(
    `topics/${topicId}/taskGroups/${taskGroupId}`,
    taskGroupId,
    true
  );

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
  writeToFirebase(`taskGroups/${taskGroupId}`, {
    id: taskGroupId,
    name: taskGroupName,
  });
  return {
    type: 'UPDATE_TASK_GROUP',
    payload: {
      taskGroupId,
      taskGroupName,
    },
  };
}
function deleteTaskGroup(taskGroupId, topicId) {
  writeToFirebase(`taskGroups/${taskGroupId}`, null, true);
  writeToFirebase(`topics/${topicId}/taskGroups/${taskGroupId}`, null, true);

  return {
    type: 'DELETE_TASK_GROUP',
    payload: { taskGroupId, topicId },
  };
}

function addTask(taskGroupId, taskText) {
  const taskId = uuid.v4();
  const today = new Date();
  writeToFirebase(
    `tasks/${taskId}`,
    {
      id: taskId,
      text: taskText,
      complete: false,
      timestamp: today,
    },
    true
  );
  writeToFirebase(`taskGroups/${taskGroupId}/tasks/${taskId}`, taskId, true);

  return {
    type: 'ADD_TASK',
    payload: {
      taskId,
      taskGroupId,
      taskText,
      taskComplete: false,
      taskTimestamp: today,
    },
  };
}

function updateTask(taskId, taskText, taskComplete) {
  writeToFirebase(`tasks/${taskId}`, {
    id: taskId,
    text: taskText,
    complete: taskComplete,
  });
  return {
    type: 'UPDATE_TASK',
    payload: {
      taskId,
      taskText,
      taskComplete,
    },
  };
}
function deleteTask(taskId, taskGroupId) {
  writeToFirebase(`tasks/${taskId}`, null, true);
  writeToFirebase(`taskGroups/${taskGroupId}/tasks/${taskId}`, null, true);

  return {
    type: 'DELETE_TASK',
    payload: { taskId, taskGroupId },
  };
}

export {
  addJournal,
  updateJournal,
  deleteJournal,
  addTopic,
  updateTopic,
  deleteTopic,
  addTaskGroup,
  updateTaskGroup,
  deleteTaskGroup,
  addTask,
  updateTask,
  deleteTask,
};
