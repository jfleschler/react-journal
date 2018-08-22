import { connect } from 'react-redux';
import {
  deleteTopic,
  addTaskGroup,
  updateTaskGroup,
  deleteTaskGroup,
  addTask,
  updateTask,
} from '../actions';
import TopicViewer from '../Components/TopicViewer';

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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateTopic: (topicId, journalId) => {
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
