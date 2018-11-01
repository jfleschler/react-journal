import React from 'react';
import ClickOutside from './ClickOutside';

class AddJournalForm extends React.Component {
  state = {
    journalName: '',
    color: '',
    isOpen: false,
  };

  handleChange = event => {
    const target = event.target;
    const value = target.value;

    this.setState({
      [target.name]: value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onAddJournal(this.state.journalName, this.state.color);

    this.setState({ journalName: '', color: '', isOpen: false });
  };

  render() {
    return (
      <div className="journal-list__add-wrapper">
        {this.state.isOpen && (
          <ClickOutside onClickOutside={() => this.setState({ isOpen: false })}>
            <form
              onSubmit={this.handleSubmit}
              className="journal-list__add-form">
              <div>Journal Name</div>
              <div>Color</div>

              <input
                name="journalName"
                value={this.state.journalName}
                onChange={this.handleChange}
                type="text"
                className="journal-list__add-input"
              />
              <input
                name="color"
                value={this.state.color}
                onChange={this.handleChange}
                type="text"
                className="journal-list__add-input"
              />
              <div />
              <button>Add</button>
            </form>
          </ClickOutside>
        )}
        <button
          onClick={() => this.setState({ isOpen: true })}
          className="journal-list__add-button">
          +
        </button>
      </div>
    );
  }
}
export default AddJournalForm;
