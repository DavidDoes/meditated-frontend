import React from 'react';
import { connect } from 'react-redux';

import { updateMoment } from '../actions/moments';

import TimeSelect from './time-select';
import LocationSelect from './location-select';

import '../styles/update-moment.css';

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
    this.setLocation = this.setLocation.bind(this);
    this.handleTime = this.handleTime.bind(this);
  }

  handleInput(event, key) {
    this.setState({
      [key]: event.target.value
    });
  }

  setLocation(newLocation) {
    this.setState({
      location: newLocation
    });
  }

  handleTime(event) {
    let time = event.target.value;
    this.setState({ time });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(updateMoment(this.props.authToken, this.state));
    this.props.refreshMoments();
    this.props.toggleShowFields();
  }

  render() {
    return (
      <div className="moment">
        <form className="updateForm" onSubmit={this.handleSubmit}>
          <div className="divTableRow">
            <span className="divTableCell">{this.props.date}</span>
            <div className="divTableCell">
              <TimeSelect handleTime={this.handleTime} time={this.state.time} />
            </div>
            <input
              required
              className="divTableCell editing"
              name="minutes"
              type="number"
              maxLength="3"
              ref={input => (this.textInput = input)}
              placeholder={this.state.minutes}
              value={this.state.minutes}
              onChange={e => this.handleInput(e, 'minutes')}
            />
            <div className="divTableCell">
              <LocationSelect setLocation={this.setLocation} location={this.state.location} />
            </div>
            <span className="divTableCell">{this.props.mental}</span>
            <span className="divTableCell">{this.props.environmental}</span>
            <span className="divTableCell edit-column">
              <button type="submit">Save</button>
              <button
                className="secondary-btn"
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
