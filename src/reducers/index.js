import { combineReducers } from 'redux';

import { journalsReducer } from './journal';
import { topicsReducer } from './topic';
import { taskGroupsReducer } from './taskGroup';
import { tasksReducer } from './task';

function activeTopicIdReducer(state = '', action) {
  if (action.type === 'OPEN_TOPIC') {
    return action.payload.topicId;
  } else {
    return state;
  }
}

export const reducers = {
  entities: combineReducers({
    journals: journalsReducer,
    topics: topicsReducer,
    taskGroups: taskGroupsReducer,
    tasks: tasksReducer,
  }),
  ui: combineReducers({
    activeTopicId: activeTopicIdReducer,
  }),
};
