import React from 'react';
import { connect } from 'react-redux';
import { getMoments } from '../actions/moments';
import Moment from './moment';

import '../styles/dropdown.css';

class MomentsMenu extends React.Component {
  constructor() {
    super();

    this.state = {
      displayMenu: false
    };

    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
  }

  componentDidMount() {
    console.log('MomentsMenu mounted');
    if (this.props.authToken) {
      getMoments(this.props.authToken);
      console.log(this.props);
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

  render() {
    let locations = []
      .concat(this.props.moments)
      .sort((a, b) => a.date < b.date)
      .map(moment => <li>{moment.location}</li>);
    console.log(locations);

    // return <ul>{locations}</ul>;

    return (
      <div className="dropdown">
        <div className="button" onClick={this.showDropdownMenu}>
          Location
        </div>
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
