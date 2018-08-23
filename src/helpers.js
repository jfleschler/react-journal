export function getSlug(name) {
  return name
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export function getActiveJournal(allJournals, journalName) {
  return Object.keys(allJournals)
    .filter(id => getSlug(allJournals[id].name) === journalName)
    .map(id => allJournals[id])[0];
}

export function getActiveTopic(activeJournal, allTopics, topicName) {
  return (
    activeJournal &&
    activeJournal.topics
      .filter(id => {
        return getSlug(allTopics[id].name) === topicName;
      })
      .map(id => allTopics[id])[0]
  );
}
