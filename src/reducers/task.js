import { combineReducers } from 'redux';
import { baseTasks } from '../demo-data';

function loadTasks(state, action) {
  const { payload } = action;
  return { ...payload };
}

function loadTaskId(state, action) {
  const { payload } = action;
  return Object.keys(payload);
}

function addTask(state, action) {
  const { payload } = action;
  const { taskId, taskText, taskComplete, taskTimestamp } = payload;

  const task = {
    id: taskId,
    text: taskText,
    complete: taskComplete,
    timestamp: taskTimestamp,
  };
  return { ...state, [taskId]: task };
}

function addTaskId(state, action) {
  const { payload } = action;
  const { taskId } = payload;
  return state.concat(taskId);
}

function updateTask(state, action) {
  const { payload } = action;
  const { taskId, taskText, taskComplete } = payload;

  const task = state[taskId];
  return {
    ...state,
    [taskId]: {
      ...task,
      text: taskText,
      complete: taskComplete,
    },
  };
}

function deleteTask(state, action) {
  const { payload } = action;
  const { taskId } = payload;

  const newState = { ...state };
  delete newState[taskId];
  return newState;
}

function deleteTaskId(state, action) {
  const { payload } = action;
  const { taskId } = payload;
  return state.filter(t => t !== taskId);
}

function tasksById(state = {}, action) {
  switch (action.type) {
    case 'LOAD_TASKS':
      return loadTasks(state, action);
    case 'ADD_TASK':
      return addTask(state, action);
    case 'UPDATE_TASK':
      return updateTask(state, action);
    case 'DELETE_TASK':
      return deleteTask(state, action);
    default:
      return state;
  }
}

function allTasks(state = [], action) {
  switch (action.type) {
    case 'LOAD_TASKS':
      return loadTaskId(state, action);
    case 'ADD_TASK':
      return addTaskId(state, action);
    case 'DELETE_TASK':
      return deleteTaskId(state, action);
    default:
      return state;
  }
}

export const tasksReducer = combineReducers({
  byId: tasksById,
  allIds: allTasks,
});
