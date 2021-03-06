import React from 'react';

import TaskList from './TaskList';
import AddTaskForm from './AddTaskForm';
import OptionButton from './OptionButton';
import ConfirmButton from './ConfirmButton';

class TaskGroup extends React.Component {
  state = {
    editing: false,
    name: '',
  };

  constructor(props) {
    super(props);

    this.state = { name: props.taskGroup.name, editing: false };
  }
  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onUpdateTastGroup(this.props.taskGroup.id, this.state.name);

    this.setState({ name: '', editing: false });
  };

  render() {
    const { id, name, tasks } = this.props.taskGroup;
    // const completedTasks = tasks.filter(task => task.complete).length;

    return (
      <div className="task-group">
        <h2 className="task-group__title">
          <div>
            {this.state.editing || name}

            {this.state.editing && (
              <form onSubmit={this.handleSubmit}>
                <input
                  placeholder="Task Group Title"
                  className="task-group__input"
                  type="text"
                  name="name"
                  value={this.state.name}
                  autoFocus
                  onBlur={() => this.setState({ editing: false })}
                  onChange={this.handleChange}
                />
              </form>
            )}

            <div className="task-group__actions">
              <OptionButton
                color="grey"
                bgColor="#f1f1f1"
                render={() => <i className="fas fa-ellipsis-h" />}
                onClick={() => null}>
                <ConfirmButton
                  onConfirm={() =>
                    this.props.onDeleteTaskGroup(id, this.props.topicId, tasks)
                  }
                  classOverride="task-group__delete-button">
                  Remove Group
                </ConfirmButton>
                <button onClick={() => this.setState({ editing: true })}>
                  Edit Title
                </button>
              </OptionButton>
            </div>
          </div>
        </h2>
        <TaskList tasks={tasks} {...this.props} />
        <AddTaskForm taskGroupId={id} onAddTask={this.props.onAddTask} />
      </div>
    );
  }
}
export default TaskGroup;
