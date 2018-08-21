import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolvers';

const schema = `
type Journal {
  id: String!
  name: String
  color: String
  topics: [Topic]
  order: Int
}

type Topic {
  id: String!
  journalId: String!
  name: String!
  taskGroups: [TaskGroup]
  order: Int
}

type TaskGroup {
  id: String!
  topicId: String!
  name: String!
  order: Int
  tasks: [Task]
}

type Task {
  id: String!
  taskGroupId: String!
  text: String!
  complete: Boolean
  order: Int
  timestamp: Int
}

# the schema allows the following query:
type Query {
  journals: [Journal]
  topic(id: String!): Topic
}

# this schema allows the following mutation:
type Mutation {
  toggleTask (
    taskId: String!
  ): Task
  createTask (
    taskGroupId: String!
    text: String!
  ): Task
  updateTask (
    taskId: String!
    text: String!
  ): Task
  deleteTask (
    taskId: ID!
  ): Task

  createTaskGroup (
    topicId: String!
    name: String!
  ): TaskGroup
  updateTaskGroup (
    taskGroupId: String!
    name: String!
  ): TaskGroup
  deleteTaskGroup (
    taskGroupId: String!
  ): TaskGroup

  createTopic (
    journalId: String!
    name: String!
  ): Topic
  updateTopic (
    topicId: String!
    name: String!
  ): Topic
  deleteTopic (
    topicId: String!
  ): Topic

  createJournal (
    name: String!
    color: String!
  ): Journal
  updateJournal (
    journalId: String!
    name: String!
    color: String!
  ): Journal
  deleteJournal (
    journalId: String!
  ): Journal
}
`;

export default makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});
