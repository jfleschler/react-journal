import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import flatmap from 'flatmap';
import OptionButton from './OptionButton';
import ConfirmButton from './ConfirmButton';
import ClickOutside from './ClickOutside';
import EditJournalForm from './EditJournalForm';
import { getSlug } from '../helpers';
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
    this.props.onAddTopic(this.props.journal.id, this.state.name);

    this.setState({ addTopic: false, name: '' });
  };

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  handleDeleteJournal = id => {
    const topics = Object.keys(this.props.topicsById)
      .filter(topicId => {
        return this.props.journal.topics.indexOf(topicId) !== -1;
      })
      .map(topicId => this.props.topicsById[topicId]);

    const allTaskGroups = flatmap(topics, topic => topic.taskGroups);
    const taskGroups = Object.keys(this.props.taskGroupsById)
      .filter(taskGroupId => {
        return allTaskGroups.indexOf(taskGroupId) !== -1;
      })
      .map(taskGroupId => this.props.taskGroupsById[taskGroupId]);
    this.props.onDeleteJournal(id, topics, taskGroups);
  };

  renderJournalTopic(topicId) {
    const isSelected = this.props.activeTopicId === topicId;
    const topic = this.props.topicsById[topicId];

    return (
      <Link to={`/${getSlug(this.props.journal.name)}/${getSlug(topic.name)}`}>
        <Entry
          selected={isSelected}
          color={this.props.journal.color}
          className="journal-entry__topic">
          {topic.name}
        </Entry>
      </Link>
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
                onUpdateJournal={this.props.onUpdateJournal}
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
                onConfirm={() => this.handleDeleteJournal(id)}
                classOverride="task-group__delete-button">
                Delete Journal
              </ConfirmButton>
            </OptionButton>
          </div>
        </div>
        {this.props.journal.topics &&
          this.props.journal.topics.map((topicId, index) => (
            <div key={topicId}>
              <div className="journal-entry__spacer" />
              {this.renderJournalTopic(topicId)}
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
