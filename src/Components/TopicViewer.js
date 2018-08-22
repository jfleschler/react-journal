import React from 'react';
import TaskGroup from './TaskGroup';
import AddTaskGroup from './AddTaskGroup';
import OptionButton from './OptionButton';
import ConfirmButton from './ConfirmButton';
import '../css/topicViewer.css';

class TopicViewer extends React.Component {
  render() {
    const { journal, topic } = this.props;
    if (!topic) return null;

    const color = journal.color;

    return (
      <div className="topic">
        <div className="topic__journal" style={{ color }}>
          {journal.name}
        </div>
        <div className="topic__name">
          {topic.name}
          <div className="topic__options">
            <OptionButton
              color="grey"
              bgColor="#f1f1f1"
              render={() => <i className="fas fa-ellipsis-h" />}
              onClick={() => null}>
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
