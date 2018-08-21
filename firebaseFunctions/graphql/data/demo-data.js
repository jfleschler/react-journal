import uuid from 'uuid';
import moment from 'moment';
import fire from '../../fire';

export const journalsRef = fire.database().ref('journals');
export const topicsRef = fire.database().ref('topics');
export const taskGroupsRef = fire.database().ref('taskGroups');
export const tasksRef = fire.database().ref('tasks');
