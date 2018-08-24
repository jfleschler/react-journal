import firebase from 'firebase';

const config = {
  databaseURL: 'https://react-journal-3318e.firebaseio.com/',
  projectId: 'react-journal-3318e',
};
const firebaseApp = firebase.initializeApp(config);

export const loadFromFirebase = (ref, type, dispatch) => {
  return firebaseApp
    .database()
    .ref(ref)
    .once('value', data => {
      if (data.val()) {
        const response = data.val();
        Object.keys(response).forEach(
          key => (response[key] = Object.assign({ id: key }, response[key]))
        );

        dispatch({
          type: type,
          payload: response,
        });
      }
    });
};

export const writeToFirebase = (ref, value, isCreate = false) => {
  if (isCreate) {
    return firebaseApp
      .database()
      .ref(ref)
      .set(value);
  } else {
    return firebaseApp
      .database()
      .ref(ref)
      .update(value);
  }
};

export const pushToFirebase = (ref, value) => {
  return firebaseApp
    .database()
    .ref(ref)
    .push(value);
};

export default firebaseApp;
