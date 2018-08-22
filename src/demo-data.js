import uuid from 'uuid';
import moment from 'moment';

const workJournalId = uuid.v4();
const personalJournalId = uuid.v4();
const learningJournalId = uuid.v4();

const folTopicId = uuid.v4();
const shoppingTopicId = uuid.v4();
const heathTopicId = uuid.v4();
const computersTopicId = uuid.v4();
const reactTopicId = uuid.v4();
const reduxTopicId = uuid.v4();
const graphQLTopicId = uuid.v4();

export const baseJournals = {
  byId: {
    [workJournalId]: {
      id: workJournalId,
      name: 'Work',
      color: '#2E92F8',
      topics: [folTopicId],
    },
    [personalJournalId]: {
      id: personalJournalId,
      name: 'Personal',
      color: '#82BB4F',
      topics: [shoppingTopicId, heathTopicId, computersTopicId],
    },
    [learningJournalId]: {
      id: learningJournalId,
      name: 'Learning',
      color: '#E97382',
      topics: [reactTopicId, reduxTopicId, graphQLTopicId],
    },
  },
  allIds: [workJournalId, personalJournalId, learningJournalId],
};

export const baseTopics = {
  byId: {
    [folTopicId]: {
      id: folTopicId,
      journalId: workJournalId,
      name: 'Florists OnLine',
    },
    [shoppingTopicId]: {
      id: shoppingTopicId,
      journalId: personalJournalId,
      name: 'Shopping',
    },
    [heathTopicId]: {
      id: heathTopicId,
      journalId: personalJournalId,
      name: 'Health',
    },
    [computersTopicId]: {
      id: computersTopicId,
      journalId: personalJournalId,
      name: 'Computers',
    },
    [reactTopicId]: {
      id: reactTopicId,
      journalId: learningJournalId,
      name: 'React',
    },
    [reduxTopicId]: {
      id: reduxTopicId,
      journalId: learningJournalId,
      name: 'Redux',
    },
    [graphQLTopicId]: {
      id: graphQLTopicId,
      journalId: learningJournalId,
      name: 'GraphQL',
    },
  },
  allIds: [
    folTopicId,
    shoppingTopicId,
    heathTopicId,
    computersTopicId,
    reactTopicId,
    reduxTopicId,
    graphQLTopicId,
  ],
};

const generalTaskGroupId = uuid.v4();
const dailyJunkGroupId = uuid.v4();
export const baseTaskGroups = {
  byId: {
    [generalTaskGroupId]: {
      id: generalTaskGroupId,
      topicId: folTopicId,
      name: 'General Tasks',
    },
    [dailyJunkGroupId]: {
      id: dailyJunkGroupId,
      topicId: folTopicId,
      name: 'Daily Junk',
    },
  },
  allIds: [generalTaskGroupId, dailyJunkGroupId],
};

const task1Id = uuid.v4();
const task2Id = uuid.v4();
const task3Id = uuid.v4();
const task4Id = uuid.v4();
const task5Id = uuid.v4();
export const baseTasks = {
  byId: {
    [task1Id]: {
      id: task1Id,
      taskGroupId: generalTaskGroupId,
      complete: true,
      text: 'Show up on time',
      timestamp: moment()
        .subtract(2, 'hours')
        .valueOf(),
    },
    [task2Id]: {
      id: task2Id,
      taskGroupId: generalTaskGroupId,
      complete: true,
      text: 'Research MacBook Pros',
      timestamp: moment()
        .subtract(1, 'hours')
        .valueOf(),
    },
    [task3Id]: {
      id: task3Id,
      taskGroupId: dailyJunkGroupId,
      complete: true,
      text: 'Attend scrum',
      timestamp: Date.now(),
    },
    [task4Id]: {
      id: task4Id,
      taskGroupId: dailyJunkGroupId,
      complete: false,
      text: 'Fix bugs',
      timestamp: Date.now(),
    },
    [task5Id]: {
      id: task5Id,
      taskGroupId: dailyJunkGroupId,
      complete: false,
      text: 'Look into Offer related issues',
      timestamp: Date.now(),
    },
  },
  allIds: [task1Id, task2Id, task3Id, task4Id, task5Id],
};

export const sampleData = {
  journals: [
    {
      id: uuid.v4(),
      name: 'Work',
      color: '#2E92F8',
      topics: [
        {
          id: uuid.v4(),
          name: 'Florists OnLine',
          notes: {},
          tasks: {
            'General Tasks': [
              {
                id: uuid.v4(),
                complete: true,
                text: 'Show up on time',
                timestamp: moment()
                  .subtract(2, 'hours')
                  .valueOf(),
              },
              {
                id: uuid.v4(),
                complete: true,
                text: 'Research MacBook Pros',
                timestamp: moment()
                  .subtract(1, 'hours')
                  .valueOf(),
              },
            ],
            'Daily Junk': [
              {
                id: uuid.v4(),
                complete: true,
                text: 'Attend scrum',
                timestamp: Date.now(),
              },
              {
                id: uuid.v4(),
                complete: false,
                text: 'Fix bugs',
                timestamp: Date.now(),
              },
              {
                id: uuid.v4(),
                complete: false,
                text: 'Look into Offer related issues',
                timestamp: Date.now(),
              },
            ],
          },
        },
      ],
    },
    {
      id: uuid.v4(),
      name: 'Personal',
      color: '#82BB4F',
      topics: [
        {
          id: uuid.v4(),
          name: 'Shopping',
          notes: {},
          tasks: {},
        },
        {
          id: uuid.v4(),
          name: 'Health',
          notes: {},
          tasks: {},
        },
        {
          id: uuid.v4(),
          name: 'Computers',
          notes: {},
          tasks: {},
        },
      ],
    },
    {
      id: uuid.v4(),
      name: 'Learning',
      color: '#E97382',
      topics: [
        {
          id: uuid.v4(),
          name: 'React',
          notes: {},
          tasks: {},
        },
        {
          id: uuid.v4(),
          name: 'Redux',
          notes: {},
          tasks: {},
        },
      ],
    },
  ],
};
