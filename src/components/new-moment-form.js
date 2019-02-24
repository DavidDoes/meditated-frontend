import React from 'react';
import { connect } from 'react-redux';
import '../styles/new-moment-form.css';
import SuccessAlert from './success-alert.js';
import { newMoment } from '../actions/moments';

export class NewMoment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: '',
      date: '',
      time: '',
      location: '',
      mental: '',
      environmental: '',
      alert_message: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleInput = this.handleInput.bind(this);
  }

  handleInput(event, key) {
    this.setState({
      [key]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ alert_message: 'success' });

    const momentObj = {
      minutes: this.state.minutes,
      date: this.state.date,
      time: this.state.time,
      location: this.state.location,
      mental: this.state.mental,
      environmental: this.state.environmental
    };
    this.props.dispatch(newMoment(this.props.authToken, momentObj));
  }

  render() {
    // set all inputs to required
    let requiredInput;
    if (this.state.validateDisplay) {
      requiredInput = <div className="">Required</div>;
    }

    return (
      <section id="form-section">
        <form id="record-moment" onSubmit={this.handleSubmit} ref="form">
          <div className="form-container">
            {requiredInput}
            <div className="minutes">
              <label htmlFor="minutes">Minutes Meditated</label>
              <input
                type="number"
                name="minutes"
                placeholder="10"
                value={this.state.minutes}
                onChange={e => this.handleInput(e, 'minutes')}
                maxLength="3"
              />
            </div>

            <div className="location">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                name="location"
                placeholder="Bedroom"
                value={this.state.location}
                onChange={e => this.handleInput(e, 'location')}
                maxLeng="25"
              />
            </div>

            <div className="date">
              <label htmlFor="date">Date & Time</label>
              <input
                type="date"
                name="date"
                value={this.state.date}
                onChange={e => this.handleInput(e, 'date')}
              />
              <input
                type="time"
                name="time"
                value={this.state.time}
                onChange={e => this.handleInput(e, 'time')}
              />
            </div>
          </div>

          <div className="form-container">
            <p>
              How much of an impact did <u>mental</u> distractions have on your ability to be
              present?
            </p>
            <fieldset>
              <div className="option">
                <label htmlFor="mental-distractions-radio">{this.state.mental}</label>
                <input
                  className="mental-distractions-radio"
                  name="mental-distractions-radio"
                  id="typeinp"
                  type="range"
                  min="0"
                  max="4"
                  value={this.state.mental}
                  onChange={e => this.handleInput(e, 'mental')}
                  step="1"
                />
              </div>
            </fieldset>
          </div>

          <div className="form-container">
            <p>
              How much of an impact did <u>environmental</u> distractions have on your ability to be
              present?
            </p>
            <fieldset>
              <div className="option">
                <label htmlFor="environmental distractions-radio">{this.state.environmental}</label>
                <input
                  id="typeinp"
                  type="range"
                  min="0"
                  max="4"
                  value={this.state.environmental}
                  onChange={e => this.handleInput(e, 'environmental')}
                  step="1"
                />
              </div>
            </fieldset>
          </div>
          {this.state.alert_message === 'success' ? <SuccessAlert /> : null}
          <button type="reset">Reset</button>
          <button type="submit">Submit</button>
        </form>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  moments: state.moments,
  authToken: state.auth.authToken
});

export default connect(mapStateToProps)(NewMoment);
