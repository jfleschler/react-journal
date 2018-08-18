import React from 'react';
import TaskGroup from './TaskGroup';
import AddTaskGroup from './AddTaskGroup';
import OptionButton from './OptionButton';
import ConfirmButton from './ConfirmButton';
import '../css/topicViewer.css';

class TopicViewer extends React.Component {
  render() {
    const { currentJournal, topic } = this.props;
    if (!topic) return null;

    const journalColor = currentJournal.color;

    return (
      <div className="topic">
        <div className="topic__journal" style={{ color: journalColor }}>
          {currentJournal.name}
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
                onConfirm={() => this.props.deleteTopic(topic.id)}
                classOverride="topic__delete-button">
                Delete Topic
              </ConfirmButton>
            </OptionButton>
          </div>
        </div>

        {Object.keys(topic.tasks).map(key => (
          <TaskGroup
            key={key}
            title={key}
            color={journalColor}
            tasks={topic.tasks[key]}
            saveTask={this.props.saveTask}
            editTask={this.props.editTask}
            addTask={this.props.addTask}
            deleteTaskGroup={this.props.deleteTaskGroup}
            renameTaskGroup={this.props.renameTaskGroup}
          />
        ))}
        <AddTaskGroup
          color={journalColor}
          addTaskGroup={this.props.addTaskGroup}
        />
      </div>
    );
  }
}
export default TopicViewer;
