import uuid from 'uuid';
import { topicsRef } from '../demo-data';
import * as Helpers from './helpers';

function createTopic(journalId, name) {
  return Helpers.findByAttribute(topicsRef, 'journalId', journalId).then(
    topics => {
      const order = topics.length;

      const newTopic = {
        journalId,
        name,
        order,
      };

      return new Promise(resolve => {
        const topic = topicsRef.push(newTopic, () => {
          resolve(Object.assign({ id: topic.key }, newTopic));
        });
      });
    }
  );
}

function readTopic(topicId) {
  return Helpers.findById(topicsRef, topicId);
}

function updateTopic(topicId, name) {
  return Helpers.updateById(topicsRef, topicId, { name });
}

function deleteTopic(topicId) {
  return Helpers.removeById(topicsRef, topicId);
}

export { createTopic, readTopic, updateTopic, deleteTopic };
