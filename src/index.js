import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { reducers } from './reducers';

import firebaseApp, { loadFromFirebase } from './firebase';
const reducer = combineReducers(reducers);
const store = createStore(reducer, applyMiddleware(thunk));

// load initial data
Promise.all([
  loadFromFirebase('/tasks', 'LOAD_TASKS', store.dispatch).then(() => {
    loadFromFirebase('/taskGroups', 'LOAD_TASK_GROUP', store.dispatch).then(
      () => {
        loadFromFirebase('/topics', 'LOAD_TOPICS', store.dispatch).then(() => {
          loadFromFirebase('/journals', 'LOAD_JOURNALS', store.dispatch);
        });
      }
    );
  }),
]).then(() => {
  console.log('loaded');
});
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
