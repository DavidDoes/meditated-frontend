import React from 'react';
import { connect } from 'react-redux';

import { updateMoment } from '../actions/moments';
import styles from '../styles/update-moment.css';

export class UpdateMoment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      date: props.date,
      minutes: props.minutes,
      time: props.time,
      location: props.location,
      mental: props.mental,
      environmental: props.environmental,
      validateDisplay: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(event, key) {
    this.setState({
      [key]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(updateMoment(this.props.authToken, this.state));
    this.props.refreshMoments();
    this.props.toggleShowFields();
  }

  render() {
    let requiredInput;
    if (this.state.validateDisplay) {
      requiredInput = <div className={styles.validate}>Required</div>;
    }

    return (
      <div className="moment">
        <form className="updateForm" onSubmit={this.handleSubmit}>
          {requiredInput}
          <div className="divTableRow editing">
            <input
              className="divTableCell"
              name="date"
              type="date"
              ref={input => (this.textInput = input)}
              placeholder={this.state.date}
              value={this.state.date}
              onChange={e => this.handleInput(e, 'date')}
            />
            <input
              className="divTableCell editing"
              name="time"
              type="time"
              ref={input => (this.textInput = input)}
              placeholder={this.state.time}
              value={this.state.time}
              onChange={e => this.handleInput(e, 'time')}
            />
            <input
              className="divTableCell editing"
              name="minutes"
              type="number"
              maxLength="3"
              ref={input => (this.textInput = input)}
              placeholder={this.state.minutes}
              value={this.state.minutes}
              onChange={e => this.handleInput(e, 'minutes')}
            />
            <input
              className="divTableCell editing"
              name="location"
              type="text"
              maxLength="25"
              ref={input => (this.textInput = input)}
              placeholder=""
              value={this.state.location}
              onChange={e => this.handleInput(e, 'location')}
            />
            <span className="divTableCell">
              <button type="submit">Save</button>
              <button
                onClick={() => {
                  this.props.toggleShowFields();
                }}
              >
                Cancel
              </button>
            </span>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  moments: state.moments,
  authToken: state.auth.authToken
});

export default connect(mapStateToProps)(UpdateMoment);
