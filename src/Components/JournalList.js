import React from 'react';
import JournalListEntry from './JournalListEntry';
import AddJournalForm from './AddJournalForm';

class JournalList extends React.Component {
  render() {
    return (
      <div className="journal-list">
        {this.props.journals.map((journal, index) => (
          <JournalListEntry
            key={journal.id}
            journal={journal}
            selectedTopic={this.props.selectedTopic}
            selectTopic={this.props.selectTopic}
            deleteJournal={this.props.deleteJournal}
            addTopic={this.props.addTopic}
          />
        ))}

        <AddJournalForm addJournal={this.props.addJournal} />
      </div>
    );
  }
}
export default JournalList;
