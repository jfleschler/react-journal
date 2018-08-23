import React from 'react';
import TaskGroup from './TaskGroup';
import AddTaskGroup from './AddTaskGroup';
import OptionButton from './OptionButton';
import ConfirmButton from './ConfirmButton';
import { getSlug } from '../helpers';

import '../css/topicViewer.css';

class TopicViewer extends React.Component {
  state = {
    topic: null,
    editing: false,
    name: '',
  };

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onUpdateTopic(this.props.topic.id, this.state.name);

    this.setState({ editing: false });

    const journalSlug = getSlug(this.props.journal.name);
    const topicSlug = getSlug(this.state.name);
    this.props.history.push(`/${journalSlug}/${topicSlug}`);
  };

  render() {
    const { journal, topic } = this.props;
    if (!topic) return null;

    const color = journal.color;

    return (
      <div className="topic">
        <div className="topic__journal" style={{ color }}>
          {journal.name}
        </div>
        {this.state.editing || (
          <div className="topic__name">
            {topic.name}
            <div className="topic__options">
              <OptionButton
                color="grey"
                bgColor="#f1f1f1"
                render={() => <i className="fas fa-ellipsis-h" />}
                onClick={() => null}>
                <button onClick={() => this.setState({ editing: true })}>
                  Edit Title
                </button>
                <ConfirmButton
                  onConfirm={() => {
                    this.props.onDeleteTopic(topic.id, journal.id);
                  }}
                  classOverride="topic__delete-button">
                  Delete Topic
                </ConfirmButton>
              </OptionButton>
            </div>
          </div>
        )}

        {this.state.editing && (
          <form onSubmit={this.handleSubmit}>
            <input
              placeholder="Topic Title"
              className="topic__input"
              type="text"
              name="name"
              value={this.state.name}
              autoFocus
              onBlur={() => this.setState({ editing: false })}
              onChange={this.handleChange}
            />
          </form>
        )}

        {this.props.taskGroups.map(taskGroup => (
          <TaskGroup
            key={taskGroup.id}
            topicId={topic.id}
            taskGroup={taskGroup}
            tasksById={this.props.tasksById}
            color={color}
            editTask={this.props.editTask}
            onAddTask={this.props.onAddTask}
            onUpdateTask={this.props.onUpdateTask}
            onDeleteTaskGroup={this.props.onDeleteTaskGroup}
            onUpdateTastGroup={this.props.onUpdateTastGroup}
          />
        ))}
        <AddTaskGroup
          color={color}
          topicId={topic.id}
          onAddTaskGroup={this.props.onAddTaskGroup}
        />
      </div>
    );
  }
}
export default TopicViewer;
