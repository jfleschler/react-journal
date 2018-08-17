import React, { Component } from 'react';
import uuid from 'uuid';

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

  addJournal = newJournal => {
    let journals = [...this.state.journals];
    journals = journals.concat({
      id: uuid.v4(),
      ...newJournal,
      topics: [],
    });

    this.setState({
      journals: [...journals],
    });
  };

  deleteJournal = journalId => {
    let journals = [...this.state.journals];
    journals = journals.filter(journal => {
      return journal.id !== journalId;
    });

    this.setState({
      journals: [...journals],
    });
  };

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

    let currentJournal = { ...this.getCurrentJournal() };
    currentJournal.topics = this.getCurrentJournal().topics.map(topic => {
      if (topic.id === selectedTopic.id) {
        return selectedTopic;
      }
      return topic;
    });

    const journals = this.state.journals.map((journal, idx) => {
      if (journal.id === currentJournal.id) {
        return currentJournal;
      }
      return journal;
    });

    this.setState({
      editingTask: {},
      journals: [...journals],
    });
  };

  cancelEdit = () => {
    this.setState({ editingTask: {} });
  };

  addTask = (key, newTask) => {
    const selectedTopic = { ...this.getSelectedTopic() };
    selectedTopic.tasks[key] = selectedTopic.tasks[key].concat(newTask);

    let currentJournal = { ...this.getCurrentJournal() };
    currentJournal.topics = this.getCurrentJournal().topics.map(topic => {
      if (topic.id === selectedTopic.id) {
        return selectedTopic;
      }
      return topic;
    });

    const journals = this.state.journals.map((journal, idx) => {
      if (journal.id === currentJournal.id) {
        return currentJournal;
      }
      return journal;
    });

    this.setState({
      editingTask: {},
      journals: [...journals],
    });
  };

  addTaskGroup = name => {
    const selectedTopic = { ...this.getSelectedTopic() };
    selectedTopic.tasks = {
      ...selectedTopic.tasks,
      [name]: [],
    };

    let currentJournal = { ...this.getCurrentJournal() };
    currentJournal.topics = this.getCurrentJournal().topics.map(topic => {
      if (topic.id === selectedTopic.id) {
        return selectedTopic;
      }
      return topic;
    });

    const journals = this.state.journals.map((journal, idx) => {
      if (journal.id === currentJournal.id) {
        return currentJournal;
      }
      return journal;
    });

    this.setState({
      editingTask: {},
      journals: [...journals],
    });
  };

  deleteTaskGroup = name => {
    const selectedTopic = { ...this.getSelectedTopic() };
    delete selectedTopic.tasks[name];

    let currentJournal = { ...this.getCurrentJournal() };
    currentJournal.topics = this.getCurrentJournal().topics.map(topic => {
      if (topic.id === selectedTopic.id) {
        return selectedTopic;
      }
      return topic;
    });

    const journals = this.state.journals.map((journal, idx) => {
      if (journal.id === currentJournal.id) {
        return currentJournal;
      }
      return journal;
    });

    this.setState({
      editingTask: {},
      journals: [...journals],
    });
  };

  renameTaskGroup = (oldTitle, newTitle) => {
    const selectedTopic = { ...this.getSelectedTopic() };
    const tasks = Object.keys(selectedTopic.tasks).map(key => {
      const newKey = key === oldTitle ? newTitle : key;
      return { [newKey]: selectedTopic.tasks[key] };
    });
    selectedTopic.tasks = Object.assign({}, ...tasks);

    delete selectedTopic.tasks[oldTitle];

    let currentJournal = { ...this.getCurrentJournal() };
    currentJournal.topics = this.getCurrentJournal().topics.map(topic => {
      if (topic.id === selectedTopic.id) {
        return selectedTopic;
      }
      return topic;
    });

    const journals = this.state.journals.map((journal, idx) => {
      if (journal.id === currentJournal.id) {
        return currentJournal;
      }
      return journal;
    });

    this.setState({
      editingTask: {},
      journals: [...journals],
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
          addJournal={this.addJournal}
          deleteJournal={this.deleteJournal}
        />
        <TopicViewer
          currentJournal={currentJournal}
          topic={selectedTopic}
          addTask={this.addTask}
          saveTask={this.saveTask}
          editTask={this.editTask}
          addTaskGroup={this.addTaskGroup}
          deleteTaskGroup={this.deleteTaskGroup}
          renameTaskGroup={this.renameTaskGroup}
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
