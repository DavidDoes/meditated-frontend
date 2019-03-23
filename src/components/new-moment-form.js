import React from 'react';
import { connect } from 'react-redux';
import '../styles/new-moment-form.css';
import SuccessAlert from './success-alert.js';
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
      alert_message: ''
      // time: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    // this.handleChange = this.handleChange.bind(this);
  }

  handleInput(event, key) {
    this.setState({
      [key]: event.target.value
    });
  }

  // store selected time and toggle class
  handleClick(event, key) {
    this.setState({
      time: event.target.value
    });

    console.log('key:', key);

    const target = event.target.id;
    console.log('target:', target);

    if (this.state.time === event.target.value) {
      return (event.target.check = true);
    }

    // check if state key matches name prop
    // if (target === key) {
    //   this.setState({ [key]: 'selected' });
    // } else {
    //   this.setState({ [key]: 'unselected' });
    // }
    // how to set other keys to 'unselected'?

    // this.state.class === 'unselected'
    //   ? this.setState({ class: 'selected' })
    //   : this.setState({ class: 'unselected' });
  }

  // handleChange(event) {
  //   const value = event.target.type === 'radio' ? event.target.checked : event.target.value;
  //   const name = event.target.name;

  //   this.setState({
  //     [name]: value
  //   });
  // }

  handleDate = date => this.setState({ date });

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ alert_message: 'success' });

    const momentObj = {
      date: this.state.date.toLocaleDateString(),
      time: this.state.time,
      minutes: this.state.minutes,
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
                className="form-input"
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
                className="form-input"
                type="text"
                name="location"
                placeholder="Bedroom"
                value={this.state.location}
                onChange={e => this.handleInput(e, 'location')}
                maxLength="25"
              />
            </div>

            <div className="date">
              <label htmlFor="date">Date & Time</label>
              <DatePicker onChange={this.handleDate} value={this.state.date} />
              {/* <input
                type="number"
                min="2018-01-01"
                placeholder="2018-01-01"
                name="date"
                value={this.state.date}
                onChange={e => this.handleInput(e, 'date')}
              /> */}
              <ul className="time-options">
                <li>
                  <label>
                    <input
                      className={this.state.class}
                      type="radio"
                      name="time"
                      id="earlymorning"
                      value="Early Morning"
                      onClick={e => this.handleClick(e, 'earlymorning')}
                    />
                    <span htlmFor="earlymorning">Early Morning</span>
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      className={this.state.class}
                      type="radio"
                      name="time"
                      id="morning"
                      value="morning"
                      onClick={e => this.handleClick(e, 'morning')}
                    />
                    <span htlmFor="morning">Morning</span>
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      className={this.state.class}
                      type="radio"
                      name="time"
                      id="afternoon"
                      value="Afternoon"
                      onClick={e => this.handleClick(e, 'afternoon')}
                    />
                    <span htlmFor="afternoon">Afternoon</span>
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      className={this.state.class}
                      type="radio"
                      name="time"
                      id="evening"
                      value="Evening"
                      onClick={e => this.handleClick(e, 'evening')}
                    />
                    <span htlmFor="evening">Evening</span>
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      className={this.state.class}
                      type="radio"
                      name="time"
                      id="bedtime"
                      value="Bedtime"
                      onClick={e => this.handleClick(e, 'bedtime')}
                    />
                    <span htlmFor="bedtime">Bedtime</span>
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
                    className={this.state.class}
                    type="radio"
                    name="mental"
                    id="mental-none"
                    value="None"
                    onClick={e => this.handleClick(e, 'mental-none')}
                  />
                  <span htlmFor="mental-none">None</span>
                </label>
              </li>
              <li>
                <label>
                  <input
                    className={this.state.class}
                    type="radio"
                    name="mental"
                    id="mental-a-little"
                    value="A Little"
                    onClick={e => this.handleClick(e, 'mental-a-little')}
                  />
                  <span htlmFor="mental-a-little">A Little</span>
                </label>
              </li>
              <li>
                <label>
                  <input
                    className={this.state.class}
                    type="radio"
                    name="mental"
                    id="mental-some"
                    value="Some"
                    onClick={e => this.handleClick(e, 'mental-some')}
                  />
                  <span htlmFor="mental-some">Some</span>
                </label>
              </li>
              <li>
                <label>
                  <input
                    className={this.state.class}
                    type="radio"
                    name="mental"
                    id="mental-a-lot"
                    value="A Lot"
                    onClick={e => this.handleClick(e, 'mental-a-lot')}
                  />
                  <span htlmFor="mental-a-lot">A Lot</span>
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
                    className={this.state.class}
                    type="radio"
                    name="environmental"
                    id="environmental-none"
                    value="None"
                    onClick={e => this.handleClick(e, 'mental-none')}
                  />
                  <span htlmFor="environmental-none">None</span>
                </label>
              </li>
              <li>
                <label>
                  <input
                    className={this.state.class}
                    type="radio"
                    name="environmental"
                    id="environmental-a-little"
                    value="A Little"
                    onClick={e => this.handleClick(e, 'environmental-a-little')}
                  />
                  <span htlmFor="environmental-a-little">A Little</span>
                </label>
              </li>
              <li>
                <label>
                  <input
                    className={this.state.class}
                    type="radio"
                    name="environmental"
                    id="environmental-some"
                    value="Some"
                    onClick={e => this.handleClick(e, 'environmental-some')}
                  />
                  <span htlmFor="environmental-some">Some</span>
                </label>
              </li>
              <li>
                <label>
                  <input
                    className={this.state.class}
                    type="radio"
                    name="environmental"
                    id="environmental-a-lot"
                    value="A Lot"
                    onClick={e => this.handleClick(e, 'environmental-a-lot')}
                  />
                  <span htlmFor="environmental-a-lot">A Lot</span>
                </label>
              </li>
            </ul>
          </div>

          <button className="log-btn" type="submit">
            Submit
          </button>
          <button className="log-btn" type="reset">
            Reset
          </button>
          {this.state.alert_message === 'success' ? <SuccessAlert /> : null}
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
