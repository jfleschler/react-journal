import { connect } from 'react-redux';
import {
  updateTopic,
  deleteTopic,
  addTaskGroup,
  updateTaskGroup,
  deleteTaskGroup,
  addTask,
  updateTask,
} from '../actions';
import { getActiveJournal, getActiveTopic } from '../helpers';
import TopicViewer from '../components/TopicViewer';

const mapStateToProps = (state, ownProps) => {
  const { journalName, topicName } = ownProps.match.params;

  const journal = getActiveJournal(state.entities.journals.byId, journalName);
  const topic = getActiveTopic(journal, state.entities.topics.byId, topicName);

  let taskGroups = [];
  if (topic) {
    taskGroups = topic.taskGroups.map(id => {
      return state.entities.taskGroups.byId[id];
    });
  }
  return {
    topic,
    journal,
    taskGroups,
    tasksById: state.entities.tasks.byId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateTopic: (topicId, topicName) => {
      dispatch(updateTopic(topicId, topicName));
    },
    onDeleteTopic: (topicId, journalId) => {
      dispatch(deleteTopic(topicId, journalId));
    },
    onAddTaskGroup: (name, color) => {
      dispatch(addTaskGroup(name, color));
    },
    onUpdateTastGroup: (id, name, color) => {
      dispatch(updateTaskGroup(id, name, color));
    },
    onDeleteTaskGroup: (taskGroupId, topicId) => {
      dispatch(deleteTaskGroup(taskGroupId, topicId));
    },
    onAddTask: (taskGroupId, taskName) => {
      dispatch(addTask(taskGroupId, taskName));
    },
    onUpdateTask: (taskId, taskName, taskCompletre) => {
      dispatch(updateTask(taskId, taskName, taskCompletre));
    },
  };
};

const TopicViewerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicViewer);

export default TopicViewerContainer;
