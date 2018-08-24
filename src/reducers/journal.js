import { combineReducers } from 'redux';
import { populateEntityArray } from '../helpers';

function loadJournals(state, action) {
  const { payload } = action;
  populateEntityArray(payload, 'topics');
  return { ...payload };
}

function loadJournalId(state, action) {
  const { payload } = action;
  return Object.keys(payload);
}

function addJournal(state, action) {
  const { payload } = action;
  const { journalId, journalName, journalColor } = payload;

  const journal = {
    id: journalId,
    name: journalName,
    color: journalColor,
    topics: [],
  };
  return { ...state, [journalId]: journal };
}

function addJournalId(state, action) {
  const { payload } = action;
  const { journalId } = payload;
  return state.concat(journalId);
}

function updateJournal(state, action) {
  const { payload } = action;
  const { journalId, journalName, journalColor } = payload;

  const journal = state[journalId];
  return {
    ...state,
    [journalId]: {
      ...journal,
      name: journalName,
      color: journalColor,
    },
  };
}

function deleteJournal(state, action) {
  const { payload } = action;
  const { journalId } = payload;

  const newState = { ...state };
  delete newState[journalId];
  return newState;
}

function deleteJournalId(state, action) {
  const { payload } = action;
  const { journalId } = payload;
  return state.filter(j => j !== journalId);
}

function addTopic(state, action) {
  const { payload } = action;
  const { journalId, topicId } = payload;

  const journal = state[journalId];
  return {
    ...state,
    [journalId]: {
      ...journal,
      topics: journal.topics.concat(topicId),
    },
  };
}

function deleteTopic(state, action) {
  const { payload } = action;
  const { topicId, journalId } = payload;

  const journal = state[journalId];
  return {
    ...state,
    [journalId]: {
      ...journal,
      topics: journal.topics.filter(t => t !== topicId),
    },
  };
}

function journalsById(state = {}, action) {
  switch (action.type) {
    case 'LOAD_JOURNALS':
      return loadJournals(state, action);
    case 'ADD_JOURNAL':
      return addJournal(state, action);
    case 'UPDATE_JOURNAL':
      return updateJournal(state, action);
    case 'DELETE_JOURNAL':
      return deleteJournal(state, action);
    case 'ADD_TOPIC':
      return addTopic(state, action);
    case 'DELETE_TOPIC':
      return deleteTopic(state, action);
    default:
      return state;
  }
}

function allJournals(state = [], action) {
  switch (action.type) {
    case 'LOAD_JOURNALS':
      return loadJournalId(state, action);
    case 'ADD_JOURNAL':
      return addJournalId(state, action);
    case 'DELETE_JOURNAL':
      return deleteJournalId(state, action);
    default:
      return state;
  }
}

export const journalsReducer = combineReducers({
  byId: journalsById,
  allIds: allJournals,
});
