import React from 'react';
import styled, { css } from 'styled-components';
import OptionButton from './OptionButton';
import ConfirmButton from './ConfirmButton';
import '../css/journalListEntry.css';

const SelectedEntry = css`
  color: ${props => props.color};
  background: ${props => props.color}20;
`;
const Entry = styled.div`
  ${props => props.selected && SelectedEntry};
`;

class JournalListEntry extends React.Component {
  renderJournalTopic(topic) {
    const isSelected = this.props.selectedTopic === topic.id;

    return (
      <Entry
        selected={isSelected}
        color={this.props.journal.color}
        className="journal-entry__topic"
        onClick={() => this.props.selectTopic(topic.id)}>
        {topic.name}
      </Entry>
    );
  }

  render() {
    const { name, color, id } = this.props.journal;
    return (
      <div className="journal-entry">
        <div className="journal-entry__name" style={{ color: color }}>
          <span className="journal-entry__badge" />
          {name}

          <div className="journal-entry__options">
            <OptionButton
              color="grey"
              bgColor="#f1f1f1"
              render={() => <i className="fas fa-ellipsis-h" />}
              onClick={() => null}>
              <ConfirmButton
                onConfirm={() => this.props.deleteJournal(id)}
                classOverride="task-group__delete-button">
                Delete Journal
              </ConfirmButton>
              <button onClick={() => this.setState({ editing: true })}>
                Edit Name
              </button>
              <button onClick={() => this.setState({ editing: true })}>
                Add Topic
              </button>
            </OptionButton>
          </div>
        </div>
        {this.props.journal.topics.map((topic, index) => (
          <div key={topic.id}>
            <div className="journal-entry__spacer" />
            {this.renderJournalTopic(topic)}
          </div>
        ))}
      </div>
    );
  }
}
export default JournalListEntry;
