import React from 'react';
import { connect } from 'react-redux';
import { getMoments } from '../actions/moments';

class LocationSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: ''
    };
  }

  componentDidMount() {
    if (this.props.authToken) {
      getMoments(this.props.authToken);
    }
  }

  handleTextFieldChange(event) {
    let location = event.target.value;
    let text = location // capitalize first letter
      .toLowerCase()
      .split(' ')
      .map(s => s.charAt(0).toUpperCase() + s.substr(1))
      .join(' ');
    this.props.setLocation(text, 'location');
  }

  render() {
    // - grab just `id` and `location`, push into empty array
    // - define new Set so that we get just 1 of each location
    // - .sort() that new set; .sort() is alphabetical by default
    let momentsList = [];
    this.props.moments.forEach(({ id, location }) => momentsList.push({ id, location }));
    let uniqueSet = [...new Set(momentsList.map(moment => moment.location))];

    // sort list alphabetically, map to render
    let sortedList = uniqueSet
      .sort()
      .map((location, index) => <option key={index}>{location}</option>);

    // store locations to state
    return (
      <div className="dropdown">
        <label htmlFor="location">Location</label>
        <input
          required
          ref=""
          className="form-input"
          type="text"
          name="location"
          placeholder="create or choose"
          value={this.props.location}
          // eslint-disable-next-line
          onChange={event => this.handleTextFieldChange(event, 'location')}
          maxLength="20"
          autoComplete="off"
        />
        <select onChange={event => this.handleTextFieldChange(event, 'location')}>
          {sortedList}
        </select>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  moments: state.moments.moments,
  authToken: state.auth.authToken
});

export default connect(mapStateToProps)(LocationSelect);
