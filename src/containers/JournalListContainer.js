import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { addJournal, updateJournal, deleteJournal, addTopic } from '../actions';
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
    onDeleteJournal: id => {
      dispatch(deleteJournal(id));
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
