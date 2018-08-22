import React, { Component } from 'react';

import uuid from 'uuid';

import JournalListContainer from './containers/JournalListContainer';
import TopicViewer from './Components/TopicViewer';
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
        {/*<TopicViewer
          currentJournal={currentJournal}
          topic={selectedTopic}
          addTask={this.addTask}
          saveTask={this.saveTask}
          editTask={this.editTask}
          addTaskGroup={this.addTaskGroup}
          deleteTaskGroup={this.deleteTaskGroup}
          renameTaskGroup={this.renameTaskGroup}
          deleteTopic={this.deleteTopic}
        />
        <EditTaskForm
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
