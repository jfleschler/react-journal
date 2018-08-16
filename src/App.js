import React, { Component } from 'react';
import moment from 'moment';

import DateCard from './Components/DateCard';
import AddTaskForm from './Components/AddTaskForm';
import EditTaskForm from './Components/EditTaskForm';

import { data } from './demo-data';

class App extends Component {
  state = {
    tasks: {},
    editingTask: {},
  };

  componentDidMount() {
    this.setState(data);
  }

  editTask = task => {
    this.setState({ editingTask: task });
  };

  saveTask = (date, newTask) => {
    const tasks = { ...this.state.tasks };
    tasks[date] = tasks[date].map(task => {
      if (task.id === newTask.id) {
        return newTask;
      }
      return task;
    });

    this.setState({
      tasks,
      editingTask: {},
    });
  };

  cancelEdit = () => {
    this.setState({ editingTask: [] });
  };

  addTask = newTask => {
    const key = moment().format('MM.DD.YY');
    const tasks = { ...this.state.tasks };
    tasks[key] = tasks[key].concat(newTask);

    this.setState({
      tasks,
    });
  };

  render() {
    return (
      <div className="app">
        {Object.keys(this.state.tasks).map(key => (
          <DateCard
            key={key}
            date={key}
            tasks={this.state.tasks[key]}
            editTask={this.editTask}
            saveTask={this.saveTask}
          />
        ))}
        <AddTaskForm addTask={this.addTask} />
        <EditTaskForm
          task={this.state.editingTask}
          saveTask={this.saveTask}
          cancelEdit={this.cancelEdit}
        />
      </div>
    );
  }
}

export default App;
