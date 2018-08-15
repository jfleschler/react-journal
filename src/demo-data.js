import uuid from 'uuid';
import moment from 'moment';

export const data = {
  tasks: {
    [moment()
      .subtract(2, 'days')
      .format('MM.DD.YY')]: [
      {
        id: uuid.v4(),
        complete: true,
        text: 'This is my first task',
        timestamp: moment()
          .subtract(2, 'days')
          .valueOf(),
      },
      {
        id: uuid.v4(),
        complete: true,
        text: 'Do yard work',
        timestamp: moment()
          .subtract(2, 'days')
          .valueOf(),
      },
      {
        id: uuid.v4(),
        complete: true,
        text: 'Clean the house',
        timestamp: moment()
          .subtract(2, 'days')
          .valueOf(),
      },
    ],
    [moment()
      .subtract(1, 'days')
      .format('MM.DD.YY')]: [
      {
        id: uuid.v4(),
        complete: true,
        text: 'Call the vet',
        timestamp: moment()
          .subtract(1, 'days')
          .valueOf(),
      },
      {
        id: uuid.v4(),
        complete: false,
        text: 'Do something else that is really hard to remember',
        timestamp: moment()
          .subtract(1, 'days')
          .valueOf(),
      },
      {
        id: uuid.v4(),
        complete: true,
        text: 'Clean the pool',
        timestamp: moment()
          .subtract(1, 'days')
          .valueOf(),
      },
    ],
    [moment().format('MM.DD.YY')]: [
      {
        id: uuid.v4(),
        complete: true,
        text: "Write that report I've been putting off",
        timestamp: Date.now(),
      },
      {
        id: uuid.v4(),
        complete: false,
        text: 'Make dinner for wife',
        timestamp: Date.now(),
      },
      {
        id: uuid.v4(),
        complete: false,
        text: 'Learn React and stuff',
        timestamp: Date.now(),
      },
    ],
  },
};
