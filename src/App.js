import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import uuid from 'uuid';

import JournalListContainer from './containers/JournalListContainer';
import TopicViewerContainer from './containers/TopicViewerContainer';

import { sampleData } from './demo-data';

class App extends Component {
  render() {
    return (
      <div className="app">
        <JournalListContainer />
        <Route path="/:journal/:topic" component={TopicViewerContainer} />
      </div>
    );
  }
}

export default App;
