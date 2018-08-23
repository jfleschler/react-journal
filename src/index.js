import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { reducers } from './reducers';

const reducer = combineReducers(reducers);
const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
