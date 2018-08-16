import React, { Component } from 'react';
import moment from 'moment';

import JournalList from './Components/JournalList';
import TopicViewer from './Components/TopicViewer';
import EditTaskForm from './Components/EditTaskForm';

import { sampleData } from './demo-data';

class App extends Component {
  state = {
    journals: [],
    selectedTopic: null,
    editingTask: {},
  };

  componentDidMount() {
    this.setState(sampleData);
  }

  editTask = task => {
    this.setState({ editingTask: task });
  };

  saveTask = (key, newTask) => {
    const selectedTopic = { ...this.getSelectedTopic() };
    selectedTopic.tasks[key] = selectedTopic.tasks[key].map(task => {
      if (task.id === newTask.id) {
        return newTask;
      }
      return task;
    });

    const currentJournal = this.getCurrentJournal().topics.map(topic => {
      if (topic.id === selectedTopic.id) {
        return selectedTopic;
      }
      return topic;
    });

    const newJournals = this.state.journals.map((journal, idx) => {
      if (journal.id === currentJournal.id) {
        return currentJournal;
      }
      return journal;
    });

    this.setState({
      ...this.state,
      editingTask: {},
      newJournals,
    });
  };

  cancelEdit = () => {
    this.setState({ editingTask: {} });
  };

  addTask = (key, newTask) => {
    const selectedTopic = { ...this.getSelectedTopic() };
    selectedTopic.tasks[key] = selectedTopic.tasks[key].concat(newTask);

    const currentJournal = this.getCurrentJournal().topics.map(topic => {
      if (topic.id === selectedTopic.id) {
        return selectedTopic;
      }
      return topic;
    });

    const newJournals = this.state.journals.map((journal, idx) => {
      if (journal.id === currentJournal.id) {
        return currentJournal;
      }
      return journal;
    });

    this.setState({
      ...this.state,
      editingTask: {},
      newJournals,
    });
  };

  selectTopic = topicId => {
    this.setState({ selectedTopic: topicId });
  };

  getCurrentJournal = () => {
    return this.state.journals.filter(journal => {
      return (
        journal.topics.filter(topic => {
          return topic.id === this.state.selectedTopic;
        }).length > 0
      );
    })[0];
  };

  getSelectedTopic = () => {
    const currentJournal = this.getCurrentJournal();

    if (!currentJournal) {
      return null;
    }

    return currentJournal.topics.filter(topic => {
      return topic.id === this.state.selectedTopic;
    })[0];
  };

  render() {
    const currentJournal = this.getCurrentJournal();
    const selectedTopic = this.getSelectedTopic();
    return (
      <div className="app">
        <JournalList
          journals={this.state.journals}
          selectedTopic={this.state.selectedTopic}
          selectTopic={this.selectTopic}
        />
        <TopicViewer
          currentJournal={currentJournal}
          topic={selectedTopic}
          addTask={this.addTask}
          saveTask={this.saveTask}
          editTask={this.editTask}
        />
        <EditTaskForm
          topic={selectedTopic}
          task={this.state.editingTask}
          saveTask={this.saveTask}
          cancelEdit={this.cancelEdit}
        />
      </div>
    );
  }
}

export default App;
