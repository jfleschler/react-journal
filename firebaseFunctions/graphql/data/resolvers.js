import uuid from 'uuid';
import {
  journalsRef,
  topicsRef,
  taskGroupsRef,
  tasksRef,
  journals,
  topics,
  taskGroups,
  tasks,
} from './demo-data';
import * as TaskResolvers from './resolvers/taskResolvers';
import * as TaskGroupResolvers from './resolvers/taskGroupResolvers';
import * as TopicResolvers from './resolvers/topicResolvers';
import * as JournalResolvers from './resolvers/journalResolvers';
import * as Helpers from './resolvers/helpers';

const resolveFunctions = {
  Query: {
    journals() {
      return journalsRef.once('value').then(snapshot => {
        const journals = snapshot.val();
        if (journals === null) return [];
        return Object.keys(journals).map(o =>
          Object.assign({ id: o }, journals[o])
        );
      });
    },
    topic(_, { id }) {
      return Helpers.findById(topicsRef, id);
    },
  },
  Mutation: {
    toggleTask(_, { taskId }) {
      return TaskResolvers.toggleTask(taskId);
    },
    createTask(_, { taskGroupId, text }) {
      return TaskResolvers.createTask(taskGroupId, text);
    },
    updateTask(_, { taskId, text }) {
      return TaskResolvers.updateTask(taskId, text);
    },
    deleteTask(_, { taskId }) {
      return TaskResolvers.deleteTask(taskId);
    },

    createTaskGroup(_, { topicId, name }) {
      return TaskGroupResolvers.createTaskGroup(topicId, name);
    },
    updateTaskGroup(_, { taskGroupId, name }) {
      return TaskGroupResolvers.updateTaskGroup(taskGroupId, name);
    },
    deleteTaskGroup(_, { taskGroupId }) {
      return TaskGroupResolvers.deleteTaskGroup(taskGroupId);
    },

    createTopic(_, { journalId, name }) {
      return TopicResolvers.createTopic(journalId, name);
    },
    updateTopic(_, { topicId, name }) {
      return TopicResolvers.updateTopic(topicId, name);
    },
    deleteTopic(_, { topicId }) {
      return TopicResolvers.deleteTopic(topicId);
    },

    createJournal(_, { name, color }) {
      return JournalResolvers.createJournal(name, color);
    },
    updateJournal(_, { journalId, name, color }) {
      return JournalResolvers.updateJournal(journalId, name, color);
    },
    deleteJournal(_, { journalId }) {
      return JournalResolvers.deleteJournal(journalId);
    },
  },
  Journal: {
    topics(journal) {
      return Helpers.findByAttribute(topicsRef, 'journalId', journal.id);
    },
  },
  Topic: {
    taskGroups(topic) {
      return Helpers.findByAttribute(taskGroupsRef, 'topicId', topic.id);
    },
  },
  TaskGroup: {
    tasks(taskGroup) {
      return Helpers.findByAttribute(tasksRef, 'taskGroupId', taskGroup.id);
    },
  },
};

export default resolveFunctions;
