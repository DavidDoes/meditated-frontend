import React from 'react';
import { connect } from 'react-redux';
import { getMoments } from '../actions/moments';

import '../styles/dropdown.css';

class MomentsMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayMenu: false,
      location: ''
    };

    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.handleListClick = this.handleListClick.bind(this);
  }

  componentDidMount() {
    if (this.props.authToken) {
      getMoments(this.props.authToken);
    }
  }

  showDropdownMenu(event) {
    event.preventDefault();
    this.setState(
      {
        displayMenu: true
      },
      () => {
        document.addEventListener('click', this.hideDropdownMenu);
      }
    );
  }

  hideDropdownMenu() {
    this.setState(
      {
        displayMenu: false
      },
      () => {
        document.removeEventListener('click', this.hideDropdownMenu);
      }
    );
  }

  selectLocation(event) {
    // this.props.handleLocation(event, 'location');
    this.setState({
      location: event.target.innerHTML
    });
  }

  handleTextFieldChange(event, key) {
    let location = event.target.value;
    let text = location // capitalize first letter
      .toLowerCase()
      .split(' ')
      .map(s => s.charAt(0).toUpperCase() + s.substr(1))
      .join(' ');
    this.props.setLocation(text, 'location');
  }

  handleListClick(event, key) {
    this.props.setLocation(event.target.innerHTML, 'location');
  }

  render() {
    let locations = []
      .concat(this.props.moments)
      .sort((a, b) => a.date < b.date)
      .map(moment => (
        <li key={moment.id} onClick={this.handleListClick}>
          {moment.location}
        </li>
      ));

    return (
      <div className="dropdown">
        <label htmlFor="location">Location</label>
        <input
          required
          onClick={this.showDropdownMenu}
          className="form-input"
          type="text"
          name="location"
          placeholder="Bedroom"
          value={this.props.location}
          onChange={event => this.handleTextFieldChange(event, 'location')}
          maxLength="20"
          autoComplete="off"
        />
        {this.state.displayMenu ? <ul>{locations}</ul> : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  moments: state.moments.moments,
  authToken: state.auth.authToken
});

export default connect(mapStateToProps)(MomentsMenu);
