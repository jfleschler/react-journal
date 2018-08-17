import React from 'react';
import styled, { css } from 'styled-components';

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
    return (
      <div className="journal-entry">
        <div
          className="journal-entry__name"
          style={{ color: this.props.journal.color }}>
          <span className="journal-entry__badge" />
          {this.props.journal.name}
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
