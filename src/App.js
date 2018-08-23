import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import JournalListContainer from './containers/JournalListContainer';
import TopicViewerContainer from './containers/TopicViewerContainer';

class App extends Component {
  render() {
    return (
      <div className="app">
        <JournalListContainer />
        <Route
          path="/:journalName/:topicName"
          component={TopicViewerContainer}
        />
      </div>
    );
  }
}

export default App;
