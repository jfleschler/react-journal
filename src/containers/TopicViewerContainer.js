import { connect } from 'react-redux';
import {
  updateTopic,
  deleteTopic,
  addTaskGroup,
  updateTaskGroup,
  deleteTaskGroup,
  addTask,
  updateTask,
  openTopic,
} from '../actions';
import TopicViewer from '../components/TopicViewer';

const mapStateToProps = state => {
  const topic = state.entities.topics.allIds
    .filter(id => state.ui.activeTopicId === id)
    .map(id => state.entities.topics.byId[id])[0];

  const journal = state.entities.journals.allIds
    .filter(id => {
      const journal = state.entities.journals.byId[id];
      return journal.topics.indexOf(state.ui.activeTopicId) !== -1;
    })
    .map(id => state.entities.journals.byId[id])[0];

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
    journalsById: state.entities.journals.byId,
    topicsById: state.entities.topics.byId,
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
    onOpenTopic: id => {
      dispatch(openTopic(id));
    },
  };
};

const TopicViewerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicViewer);

export default TopicViewerContainer;
