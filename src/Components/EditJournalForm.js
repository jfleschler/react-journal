import React from 'react';
import styled from 'styled-components';
import '../css/editJournalForm.css';

const EditForm = styled.form`
  background: ${props => props.color};

  &:before {
    border-bottom: 11px solid ${props => props.color};
  }
`;

class EditJournalForm extends React.Component {
  state = {
    journalName: '',
    color: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      journalName: props.journal.name,
      color: props.journal.color,
    };
  }

  handleChange = event => {
    const target = event.target;
    const value = target.value;

    this.setState({
      [target.name]: value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.editJournal({
      id: this.props.journal.id,
      name: this.state.journalName,
      color: this.state.color,
    });

    this.setState({ journalName: '', color: '' });
    this.props.onDone();
  };

  render() {
    return (
      <div className="journal-list__edit-wrapper">
        <EditForm
          color={this.props.journal.color}
          onSubmit={this.handleSubmit}
          className="journal-list__edit-form">
          <div>Journal Name</div>
          <div>Color</div>

          <input
            name="journalName"
            value={this.state.journalName}
            onChange={this.handleChange}
            type="text"
            className="journal-list__edit-input"
          />
          <input
            name="color"
            value={this.state.color}
            onChange={this.handleChange}
            type="text"
            className="journal-list__edit-input"
          />
          <div />
          <button type="submit">Save</button>
        </EditForm>
      </div>
    );
  }
}
export default EditJournalForm;
