import React from 'react';
import { connect } from 'react-redux';

import { updateMoment } from '../actions/moments';
import Select from 'react-select';

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

  handleTime = option => {
    const time = option.value;
    this.setState({ time });
  };

  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(updateMoment(this.props.authToken, this.state));
    this.props.refreshMoments();
    this.props.toggleShowFields();
  }

  render() {
    const options = [
      { value: 'Early Morning', label: 'Early Morning' },
      { value: 'Morning', label: 'Morning' },
      { value: 'Afternoon', label: 'Afternoon' },
      { value: 'Evening', label: 'Evening' },
      { value: 'Bedtime', label: 'Bedtime' }
    ];
    return (
      <div className="moment">
        <form className="updateForm" onSubmit={this.handleSubmit}>
          <div className="divTableRow">
            <span className="divTableCell">{this.props.date}</span>
            <Select
              options={options}
              name="time"
              // ref={input => (this.textInput = input)}
              placeholder={this.state.time}
              value={this.state.value}
              onChange={this.handleTime}
            />
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
            <input
              required
              className="divTableCell location editing"
              name="location"
              type="text"
              maxLength="25"
              ref={input => (this.textInput = input)}
              placeholder=""
              value={this.state.location}
              onChange={e => this.handleInput(e, 'location')}
            />
            <span className="divTableCell">{this.props.mental}</span>
            <span className="divTableCell">{this.props.environmental}</span>
            <span className="divTableCell edit-column">
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
