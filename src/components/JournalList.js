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
            onDeleteJournal={this.props.onDeleteJournal}
            onUpdateJournal={this.props.onUpdateJournal}
            onOpenTopic={this.props.onOpenTopic}
            activeTopicId={this.props.activeTopicId}
            topicsById={this.props.topicsById}
            taskGroupsById={this.props.taskGroupsById}
            onAddTopic={this.props.onAddTopic}
          />
        ))}

        <AddJournalForm onAddJournal={this.props.onAddJournal} />
      </div>
    );
  }
}
export default JournalList;
