import { combineReducers } from 'redux';

import { journalsReducer } from './journal';
import { topicsReducer } from './topic';
import { taskGroupsReducer } from './taskGroup';
import { tasksReducer } from './task';

export const reducers = {
  entities: combineReducers({
    journals: journalsReducer,
    topics: topicsReducer,
    taskGroups: taskGroupsReducer,
    tasks: tasksReducer,
  }),
};
