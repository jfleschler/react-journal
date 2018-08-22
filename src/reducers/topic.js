import { combineReducers } from 'redux';
import { baseTopics } from '../demo-data';

function addTopic(state, action) {
  const { payload } = action;
  const { topicId, topicName } = payload;

  const topic = {
    id: topicId,
    name: topicName,
    taskGroups: [],
  };
  return { ...state, [topicId]: topic };
}

function addTopicId(state, action) {
  const { payload } = action;
  const { topicId } = payload;
  return state.concat(topicId);
}

function updateTopic(state, action) {
  const { payload } = action;
  const { topicId, topicName } = payload;

  const topic = state[topicId];
  return {
    ...state,
    [topicId]: {
      ...topic,
      name: topicName,
    },
  };
}

function deleteTopic(state, action) {
  const { payload } = action;
  const { topicId } = payload;
  console.log(payload);
  const newState = { ...state };
  delete newState[topicId];
  return newState;
}

function deleteTopicId(state, action) {
  const { payload } = action;
  const { topicId } = payload;
  return state.filter(t => t !== topicId);
}

function addTaskGroup(state, action) {
  const { payload } = action;
  const { topicId, taskGroupId } = payload;

  const topic = state[topicId];
  return {
    ...state,
    [topicId]: {
      ...topic,
      taskGroups: topic.taskGroups.concat(taskGroupId),
    },
  };
}

function deleteTaskGroup(state, action) {
  const { payload } = action;
  const { taskGroupId, topicId } = payload;
  console.log(taskGroupId, topicId);

  const topic = state[topicId];
  return {
    ...state,
    [topicId]: {
      ...topic,
      taskGroups: topic.taskGroups.filter(t => t !== taskGroupId),
    },
  };
}

function topicsById(state = baseTopics.byId, action) {
  switch (action.type) {
    case 'ADD_TOPIC':
      return addTopic(state, action);
    case 'UPDATE_TOPIC':
      return updateTopic(state, action);
    case 'DELETE_TOPIC':
      return deleteTopic(state, action);
    case 'ADD_TASK_GROUP':
      return addTaskGroup(state, action);
    case 'DELETE_TASK_GROUP':
      return deleteTaskGroup(state, action);
    default:
      return state;
  }
}

function allTopics(state = baseTopics.allIds, action) {
  switch (action.type) {
    case 'ADD_TOPIC':
      return addTopicId(state, action);
    case 'DELETE_TOPIC':
      return deleteTopicId(state, action);
    default:
      return state;
  }
}

export const topicsReducer = combineReducers({
  byId: topicsById,
  allIds: allTopics,
});
