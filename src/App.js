import React, { Component } from 'react';
import moment from 'moment';

import DateTasks from './Components/DateTasks';
import AddTaskForm from './Components/AddTaskForm';
import { data } from './demo-data';

class App extends Component {
  state = {
    tasks: {},
  };

  componentDidMount() {
    this.setState(data);
  }

  updateTask = (date, index, newTask) => {
    const tasks = { ...this.state.tasks };
    tasks[date] = tasks[date].map(task => {
      if (task.id === newTask.id) {
        return newTask;
      }
      return task;
    });

    this.setState({
      tasks,
    });
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
        <DateTasks tasks={this.state.tasks} updateTask={this.updateTask} />
        <AddTaskForm addTask={this.addTask} />
      </div>
    );
  }
}

export default App;
