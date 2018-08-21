function findById(collectionRef, id) {
  const itemRef = collectionRef.child(id);
  return itemRef.once('value').then(snapshot => {
    const item = snapshot.val();
    if (item === null) throw new Error(`Couldn't find item with id ${id}`);
    return Object.assign({ id }, item);
  });
}

function removeById(collectionRef, id) {
  const itemRef = collectionRef.child(id);
  return itemRef
    .once('value')
    .then(snapshot => {
      const item = snapshot.val();
      if (item === null)
        throw new Error(`Couldn't find item to remove with id ${id}`);
      return Object.assign({ id }, item);
    })
    .then(item => itemRef.remove().then(() => item));
}

function updateById(collectionRef, id, attributes) {
  const itemRef = collectionRef.child(id);

  return itemRef
    .once('value')
    .then(snapshot => {
      const item = snapshot.val();
      if (item === null)
        throw new Error(`Couldn't find item to update with id ${id}`);
      return item;
    })
    .then(item => {
      const update = Object.assign(item, attributes);
      delete update.id;
      return itemRef.set(update).then(() => Object.assign({ id }, update));
    });
}

function findByAttribute(collectionRef, attribute, value) {
  return collectionRef
    .orderByChild(attribute)
    .equalTo(value)
    .once('value')
    .then(snapshot => {
      const items = snapshot.val();
      if (items === null) return [];
      return Object.keys(items).map(o => Object.assign({ id: o }, items[o]));
    });
}

export { findById, removeById, updateById, findByAttribute };
