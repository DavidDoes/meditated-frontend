import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import '../styles/new-moment-form.css';
import { newMoment } from '../actions/moments';

import DatePicker from 'react-date-picker';

export class NewMoment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      time: '',
      minutes: '',
      location: '',
      mental: '',
      environmental: '',
      redirectToDashboard: false
    };
    this.baseState = this.state; // store base state for future
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // reset to base state
  resetForm = () => {
    this.setState(this.baseState);
  };

  handleDate = date => this.setState({ date });

  // store minutes
  handleMinutes(event, key) {
    this.setState({
      [key]: event.target.value.substr(0, 3)
    });
  }

  handleLocation(event, key) {
    // capitalize first letter of each word of input
    let text = event.target.value
      .toLowerCase()
      .split(' ')
      .map(s => s.charAt(0).toUpperCase() + s.substr(1))
      .join(' ');

    // store location in state
    this.setState({
      [key]: text.substr(0, 15)
    });
  }

  // store selected 'time'
  handleTime(event, key) {
    this.setState({
      time: event.target.value
    });

    if (this.state.time === event.target.value) {
      return (event.target.check = true);
    }
  }

  // store selected 'mental'
  handleMental(event, key) {
    this.setState({
      mental: event.target.value
    });

    if (this.state.mental === event.target.value) {
      return (event.target.check = true);
    }
  }

  // store selected 'environmental'
  handleEnv(event, key) {
    this.setState({
      environmental: event.target.value
    });

    if (this.state.environmental === event.target.value) {
      return (event.target.check = true);
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const momentObj = {
      date: this.state.date.toLocaleDateString(),
      time: this.state.time,
      minutes: this.state.minutes,
      location: this.state.location,
      mental: this.state.mental,
      environmental: this.state.environmental
    };

    this.props.dispatch(newMoment(this.props.authToken, momentObj));
    this.setState({
      redirectToDashboard: true
    });
  }

  render() {
    // redirect to dashboard on successful submit
    if (this.state.redirectToDashboard) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <section id="form-section">
        <form id="record-moment" onSubmit={this.handleSubmit} ref="form">
          <div className="form-container">
            <div className="minutes">
              <label htmlFor="minutes">Minutes Meditated</label>
              <input
                required
                className="form-input"
                type="number"
                name="minutes"
                placeholder="10"
                value={this.state.minutes}
                onChange={e => this.handleMinutes(e, 'minutes')}
                maxLength="3"
              />
            </div>

            <div className="location">
              <label htmlFor="location">Location</label>
              <input
                required
                className="form-input"
                type="text"
                name="location"
                placeholder="Bedroom"
                value={this.state.location}
                onChange={e => this.handleLocation(e, 'location')}
                maxLength="25"
              />
            </div>

            <div className="date">
              <label htmlFor="date">Date & Time</label>
              <DatePicker onChange={this.handleDate} value={this.state.date} />

              <ul className="time-options">
                <li>
                  <label>
                    <input
                      required
                      className={this.state.class}
                      type="radio"
                      name="time"
                      id="earlymorning"
                      value="Early Morning"
                      onChange={e => this.handleTime(e, 'earlymorning')}
                    />
                    <span htmlFor="earlymorning">Early Morning</span>
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      required
                      className={this.state.class}
                      type="radio"
                      name="time"
                      id="morning"
                      value="Morning"
                      onChange={e => this.handleTime(e, 'morning')}
                    />
                    <span htmlFor="morning">Morning</span>
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      required
                      className={this.state.class}
                      type="radio"
                      name="time"
                      id="afternoon"
                      value="Afternoon"
                      onChange={e => this.handleTime(e, 'afternoon')}
                    />
                    <span htmlFor="afternoon">Afternoon</span>
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      required
                      className={this.state.class}
                      type="radio"
                      name="time"
                      id="evening"
                      value="Evening"
                      onChange={e => this.handleTime(e, 'evening')}
                    />
                    <span htmlFor="evening">Evening</span>
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      required
                      className={this.state.class}
                      type="radio"
                      name="time"
                      id="bedtime"
                      value="Bedtime"
                      onChange={e => this.handleTime(e, 'bedtime')}
                    />
                    <span htmlFor="bedtime">Bedtime</span>
                  </label>
                </li>
              </ul>
            </div>

            <ul className="mental-options">
              <p>
                How much of an impact did <u>mental</u> distractions have on your ability to be
                present?
              </p>
              <li>
                <label>
                  <input
                    required
                    className={this.state.class}
                    type="radio"
                    name="mental"
                    id="mental-none"
                    value="None"
                    onChange={e => this.handleMental(e, 'mental-none')}
                  />
                  <span htmlFor="mental-none">None</span>
                </label>
              </li>
              <li>
                <label>
                  <input
                    required
                    className={this.state.class}
                    type="radio"
                    name="mental"
                    id="mental-a-little"
                    value="A Little"
                    onChange={e => this.handleMental(e, 'mental-a-little')}
                  />
                  <span htmlFor="mental-a-little">A Little</span>
                </label>
              </li>
              <li>
                <label>
                  <input
                    required
                    className={this.state.class}
                    type="radio"
                    name="mental"
                    id="mental-some"
                    value="Some"
                    onChange={e => this.handleMental(e, 'mental-some')}
                  />
                  <span htmlFor="mental-some">Some</span>
                </label>
              </li>
              <li>
                <label>
                  <input
                    required
                    className={this.state.class}
                    type="radio"
                    name="mental"
                    id="mental-a-lot"
                    value="A Lot"
                    onChange={e => this.handleMental(e, 'mental-a-lot')}
                  />
                  <span htmlFor="mental-a-lot">A Lot</span>
                </label>
              </li>
            </ul>

            <ul className="environmental-options">
              <p>
                How much of an impact did <u>environmental</u> distractions have on your ability to
                be present?
              </p>
              <li>
                <label>
                  <input
                    required
                    className={this.state.class}
                    type="radio"
                    name="environmental"
                    id="environmental-none"
                    value="None"
                    onChange={e => this.handleEnv(e, 'mental-none')}
                  />
                  <span htmlFor="environmental-none">None</span>
                </label>
              </li>
              <li>
                <label>
                  <input
                    required
                    className={this.state.class}
                    type="radio"
                    name="environmental"
                    id="environmental-a-little"
                    value="A Little"
                    onChange={e => this.handleEnv(e, 'environmental-a-little')}
                  />
                  <span htmlFor="environmental-a-little">A Little</span>
                </label>
              </li>
              <li>
                <label>
                  <input
                    required
                    className={this.state.class}
                    type="radio"
                    name="environmental"
                    id="environmental-some"
                    value="Some"
                    onChange={e => this.handleEnv(e, 'environmental-some')}
                  />
                  <span htmlFor="environmental-some">Some</span>
                </label>
              </li>
              <li>
                <label>
                  <input
                    required
                    className={this.state.class}
                    type="radio"
                    name="environmental"
                    id="environmental-a-lot"
                    value="A Lot"
                    onChange={e => this.handleEnv(e, 'environmental-a-lot')}
                  />
                  <span htmlFor="environmental-a-lot">A Lot</span>
                </label>
              </li>
            </ul>
          </div>
          <div>
            <button onClick={this.resetForm} className="main-btn secondary-btn" type="reset">
              Reset
            </button>
            <button className="main-btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  moments: state.moments.moments,
  authToken: state.auth.authToken
});

export default connect(mapStateToProps)(NewMoment);
