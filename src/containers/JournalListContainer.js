import { connect } from 'react-redux';
import {
  addJournal,
  updateJournal,
  deleteJournal,
  addTopic,
  openTopic,
} from '../actions';
import JournalList from '../components/JournalList';

const mapStateToProps = state => {
  const journals = state.entities.journals.allIds.map(id => {
    return state.entities.journals.byId[id];
  });

  return {
    journals,
    topicsById: state.entities.topics.byId,
    activeTopicId: state.ui.activeTopicId,
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
    onOpenTopic: id => {
      dispatch(openTopic(id));
    },
  };
};

const JournalListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(JournalList);

export default JournalListContainer;
