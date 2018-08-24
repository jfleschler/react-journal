import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  addJournal,
  updateJournal,
  deleteJournal,
  addTopic,
  deleteTask,
  deleteTaskGroup,
  deleteTopic,
} from '../actions';
import { getActiveJournal, getActiveTopic } from '../helpers';
import JournalList from '../components/JournalList';

const mapStateToProps = (state, ownProps) => {
  const journals = state.entities.journals.allIds.map(id => {
    return state.entities.journals.byId[id];
  });
  const { pathname } = ownProps.location;
  const [topicName, journalName] = pathname.split('/').reverse();

  const journal = getActiveJournal(state.entities.journals.byId, journalName);
  const topic = getActiveTopic(journal, state.entities.topics.byId, topicName);

  return {
    journals,
    topicsById: state.entities.topics.byId,
    taskGroupsById: state.entities.taskGroups.byId,
    activeTopicId: topic && topic.id,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddJournal: (name, color) => {
      dispatch(addJournal(name, color));
    },
    onUpdateJournal: (id, name, color) => {
      dispatch(updateJournal(id, name, color));
    },
    onDeleteJournal: (journalId, topics, taskGroups) => {
      topics.forEach(topic => {
        taskGroups.forEach(taskGroup => {
          taskGroup.tasks.forEach(task =>
            dispatch(deleteTask(task, taskGroup.id))
          );
          dispatch(deleteTaskGroup(taskGroup.id, topic.id));
        });
        dispatch(deleteTopic(topic.id, journalId));
      });
      dispatch(deleteJournal(journalId));
    },
    onAddTopic: (id, name) => {
      dispatch(addTopic(id, name));
    },
  };
};

const JournalListContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(JournalList)
);

export default JournalListContainer;
