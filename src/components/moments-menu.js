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

  handleTextFieldChange(event) {
    let location = event.target.value;
    let text = location // capitalize first letter
      .toLowerCase()
      .split(' ')
      .map(s => s.charAt(0).toUpperCase() + s.substr(1))
      .join(' ');
    this.props.setLocation(text, 'location');
  }

  handleListClick(event) {
    this.props.setLocation(event.target.innerHTML, 'location');
  }

  render() {
    let momentsList = [];
    this.props.moments.forEach(({ id, location }) => momentsList.push({ id, location }));
    let uniqueSet = [...new Set(momentsList.map(moment => moment.location))];

    // sort list alpha, map to render
    let dropdownMenu = uniqueSet
      .sort((a, b) => {
        if (a < b) return -1;
        else if (a > b) return 1;
        return 0;
      })
      .map((location, index) => (
        <li key={index} onClick={this.handleListClick}>
          {location}
        </li>
      ));

    return (
      <div className="dropdown">
        <label htmlFor="location">Location</label>
        <input
          required
          onFocus={this.showDropdownMenu}
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
        {this.state.displayMenu ? <ul>{dropdownMenu}</ul> : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  moments: state.moments.moments,
  authToken: state.auth.authToken
});

export default connect(mapStateToProps)(MomentsMenu);
