import uuid from 'uuid';
import moment from 'moment';

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
