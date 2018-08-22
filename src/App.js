import React, { Component } from 'react';

import uuid from 'uuid';

import JournalListContainer from './containers/JournalListContainer';
import TopicViewerContainer from './containers/TopicViewerContainer';
import EditTaskForm from './Components/EditTaskForm';

import { sampleData } from './demo-data';

class App extends Component {
  state = {
    journals: [],
    selectedTopic: null,
    editingTask: {},
  };

  render() {
    return (
      <div className="app">
        <JournalListContainer />
        <TopicViewerContainer />
        {/*<EditTaskForm
          topic={selectedTopic}
          task={this.state.editingTask}
          saveTask={this.saveTask}
          cancelEdit={this.cancelEdit}
        />*/}
      </div>
    );
  }
}

export default App;
