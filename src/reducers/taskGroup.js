import { combineReducers } from 'redux';
import { baseTaskGroups } from '../demo-data';

function addTaskGroup(state, action) {
  const { payload } = action;
  const { taskGroupId, taskGroupName } = payload;

  const taskGroup = {
    id: taskGroupId,
    name: taskGroupName,
    tasks: [],
  };
  return { ...state, [taskGroupId]: taskGroup };
}

function addTaskGroupId(state, action) {
  const { payload } = action;
  const { taskGroupId } = payload;
  return state.concat(taskGroupId);
}

function updateTaskGroup(state, action) {
  const { payload } = action;
  const { taskGroupId, taskGroupName } = payload;

  const taskGroup = state[taskGroupId];
  return {
    ...state,
    [taskGroupId]: {
      ...taskGroup,
      name: taskGroupName,
    },
  };
}

function deleteTaskGroup(state, action) {
  const { payload } = action;
  const { taskGroupId } = payload;

  const newState = { ...state };
  delete newState[taskGroupId];
  return newState;
}

function deleteTaskGroupId(state, action) {
  const { payload } = action;
  const { taskGroupId } = payload;
  return state.filter(t => t !== taskGroupId);
}

function addTask(state, action) {
  const { payload } = action;
  const { taskGroupId, taskId } = payload;

  const taskGroup = state[taskGroupId];
  return {
    ...state,
    [taskGroupId]: {
      ...taskGroup,
      tasks: taskGroup.tasks.concat(taskId),
    },
  };
}

function deleteTask(state, action) {
  const { payload } = action;
  const { taskGroupId, taskId } = payload;

  const taskGroup = state[taskGroupId];
  return {
    ...state,
    [taskGroupId]: {
      ...taskGroup,
      tasks: taskGroup.tasks.filter(t => t !== taskId),
    },
  };
}

function taskGroupsById(state = baseTaskGroups.byId, action) {
  switch (action.type) {
    case 'ADD_TASK_GROUP':
      return addTaskGroup(state, action);
    case 'UPDATE_TASK_GROUP':
      return updateTaskGroup(state, action);
    case 'DELETE_TASK_GROUP':
      return deleteTaskGroup(state, action);
    case 'ADD_TASK':
      return addTask(state, action);
    case 'DELETE_TASK':
      return deleteTask(state, action);
    default:
      return state;
  }
}

function allTaskGroups(state = baseTaskGroups.allIds, action) {
  switch (action.type) {
    case 'ADD_TASK_GROUP':
      return addTaskGroupId(state, action);
    case 'DELETE_TASK_GROUP':
      return deleteTaskGroupId(state, action);
    default:
      return state;
  }
}

export const taskGroupsReducer = combineReducers({
  byId: taskGroupsById,
  allIds: allTaskGroups,
});
