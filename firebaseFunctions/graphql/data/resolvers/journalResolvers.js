import uuid from 'uuid';
import { journalsRef } from '../demo-data';
import * as Helpers from './helpers';

function createJournal(name, color) {
  const newJournal = {
    name,
    color,
  };

  return new Promise(resolve => {
    const journal = journalsRef.push(newJournal, () => {
      resolve(Object.assign({ id: journal.key }, newJournal));
    });
  });
}

function readJournal(journalId) {
  return Helpers.findById(journalsRef, journalId);
}

function updateJournal(journalId, name, color) {
  return Helpers.updateById(journalsRef, journalId, { name, color });
}

function deleteJournal(journalId) {
  return Helpers.removeById(journalsRef, journalId);
}

export { createJournal, readJournal, updateJournal, deleteJournal };
