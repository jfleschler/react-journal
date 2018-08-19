import React from 'react';
import styled, { css } from 'styled-components';
import OptionButton from './OptionButton';
import ConfirmButton from './ConfirmButton';
import ClickOutside from './ClickOutside';
import EditJournalForm from './EditJournalForm';
import '../css/journalListEntry.css';

const SelectedEntry = css`
  color: ${props => props.color};
  background: ${props => props.color}20;
`;
const Entry = styled.div`
  ${props => props.selected && SelectedEntry};
`;

class JournalListEntry extends React.Component {
  state = { name: '', addTopic: false, editing: false };

  handleSubmit = event => {
    event.preventDefault();
    this.props.addTopic(this.props.journal.id, this.state.name);

    this.setState({ addTopic: false, name: '' });
  };

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

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
        {this.state.editing && (
          <ClickOutside
            onClickOutside={() => this.setState({ editing: false })}>
            <div>
              <EditJournalForm
                journal={this.props.journal}
                editJournal={this.props.editJournal}
                onDone={() => this.setState({ editing: false })}
              />
            </div>
          </ClickOutside>
        )}

        <div className="journal-entry__name" style={{ color: color }}>
          <span className="journal-entry__badge" />
          {name}

          <div className="journal-entry__options">
            <OptionButton
              color="grey"
              bgColor="#f1f1f1"
              render={() => <i className="fas fa-ellipsis-h" />}
              onClick={() => null}>
              <button onClick={() => this.setState({ addTopic: true })}>
                Add Topic
              </button>
              <button onClick={() => this.setState({ editing: true })}>
                Settings
              </button>
              <ConfirmButton
                onConfirm={() => this.props.deleteJournal(id)}
                classOverride="task-group__delete-button">
                Delete Journal
              </ConfirmButton>
            </OptionButton>
          </div>
        </div>
        {this.props.journal.topics.map((topic, index) => (
          <div key={topic.id}>
            <div className="journal-entry__spacer" />
            {this.renderJournalTopic(topic)}
          </div>
        ))}

        {this.state.addTopic && (
          <React.Fragment>
            <div className="journal-entry__spacer" />
            <div className="journal-entry__add-name">
              <form onSubmit={this.handleSubmit}>
                <input
                  className="journal-entry__input"
                  type="text"
                  name="text"
                  value={this.state.name}
                  autoFocus
                  onChange={this.handleChange}
                />
              </form>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}
export default JournalListEntry;
