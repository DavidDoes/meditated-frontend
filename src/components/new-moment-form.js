import React from 'react';

import '../styles/new-moment-form.css';

export default class NewMoment extends React.Component {
  render() {
    let successMessage;
    if (this.props.submitSucceeded) {
      successMessage = <div className="message-success">Congratulations! You Meditated!</div>;
    }

    let errorMessage;
    if (this.props.error) {
      errorMessage = <div className="message-error">{this.props.error}</div>;
    }

    return (
      <section id="form-section">
        <form id="record-moment">
          {successMessage}
          {errorMessage}
          <div className="form-container">
            <div className="duration">
              <label htmlFor="duration">Minutes Meditated</label>
              <input type="number" name="duration" placeholder="10" required />
            </div>

            <div className="location">
              <label htmlFor="location">Location</label>
              <input type="text" name="location" placeholder="Bedroom" required />
            </div>

            <div className="date">
              <label htmlFor="date">Date & Time</label>
              <input type="date" name="date" required />
              <input type="time" name="time" required />
            </div>
          </div>

          <div className="form-container">
            <p>
              How much of an impact did <u>mental</u> distractions have on your ability to be
              present?
            </p>
            <fieldset>
              <div className="option">
                <label htmlFor="mental-distractions-radio">0</label>
                <input className="mental-distractions-radio" type="radio" value="0" />
              </div>
              <div className="option">
                <label htmlFor="mental-distractions-radio">1</label>
                <input
                  className="mental-distractions-radio"
                  name="mental-distractions-radio"
                  type="radio"
                  value="1"
                />
              </div>
              <div className="option">
                <label htmlFor="mental-distractions-radio">2</label>
                <input
                  className="mental-distractions-radio"
                  name="mental-distractions-radio"
                  type="radio"
                  value="2"
                />
              </div>
              <div className="option">
                <label htmlFor="mental-distractions-radio">3</label>
                <input
                  className="mental-distractions-radio"
                  name="mental-distractions-radio"
                  type="radio"
                  value="3"
                />
              </div>
              <div className="option">
                <label htmlFor="mental-distractions-radio">4</label>
                <input
                  className="mental-distractions-radio"
                  name="mental-distractions-radio"
                  type="radio"
                  value="4"
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
                <label htmlFor="environmental distractions-radio">0</label>
                <input className="environmental distractions-radio" type="radio" value="0" />
              </div>
              <div className="option">
                <label htmlFor="environmental distractions-radio">1</label>
                <input
                  className="environmental distractions-radio"
                  name="environmental distractions-radio"
                  type="radio"
                  value="1"
                />
              </div>
              <div className="option">
                <label htmlFor="environmental distractions-radio">2</label>
                <input
                  className="environmental distractions-radio"
                  name="environmental distractions-radio"
                  type="radio"
                  value="2"
                />
              </div>
              <div className="option">
                <label htmlFor="environmental distractions-radio">3</label>
                <input
                  className="environmental distractions-radio"
                  name="environmental distractions-radio"
                  type="radio"
                  value="3"
                />
              </div>
              <div className="option">
                <label htmlFor="environmental distractions-radio">4</label>
                <input
                  className="environmental distractions-radio"
                  name="environmental distractions-radio"
                  type="radio"
                  value="4"
                />
              </div>
            </fieldset>
          </div>

          <button type="reset">Reset</button>
          <button type="submit">Submit</button>
        </form>
      </section>
    );
  }
}
