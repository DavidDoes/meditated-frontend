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
    // this.checkIfDuplicate(this.props.moments);
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
    console.log(event.target.innerHTML);
  }

  // checkIfDuplicate(moments) {
  //   let momentsList = [];
  //   moments.forEach(({ id, location }) =>
  //     // console.log('id, location', { id, location })
  //     momentsList.push({ id, location })
  //   );
  //   console.log(momentsList);

  //   let uniqueList = [...new Set(momentsList.map(moment => moment.location))];
  //   return uniqueList;
  // }

  // clicked item not going to state

  render() {
    let momentsList = [];
    this.props.moments.forEach(({ id, location }) => momentsList.push({ id, location }));
    let uniqueSet = [...new Set(momentsList.map(moment => moment.location))];
    let dropdownList = Array.from(uniqueSet);
    let menu = dropdownList.map(location => (
      <li key={Math.floor(Math.random() * 10000)} onClick={this.handleListClick}>
        {location}
      </li>
    ));
    console.log(menu);

    // let locations = []
    //   .concat(this.props.moments)
    //   .sort((a, b) => a.date < b.date)
    //   .map(moment => (
    //     <li key={moment.id} onClick={this.handleListClick}>
    //       {moment.location}
    //     </li>
    //   ));

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
        {/* {this.state.displayMenu ? <ul>{locations}</ul> : null} */}
        {this.state.displayMenu ? <ul>{menu}</ul> : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  moments: state.moments.moments,
  authToken: state.auth.authToken
});

export default connect(mapStateToProps)(MomentsMenu);
