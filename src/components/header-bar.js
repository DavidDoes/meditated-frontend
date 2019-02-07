import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';

import '../styles/header-bar.css';

export class HeaderBar extends React.Component {
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render() {
    // Only render logout if we are logged in,
    // else render login
    let logInOrOut;
    if (this.props.loggedIn) {
      logInOrOut = <button onClick={() => this.logOut()}>Log out</button>;
    } else {
      logInOrOut = (
        <li>
          <Link to="/login">Login</Link>
        </li>
      );
    }
    return (
      <header className="navbar">
        <nav className="navbar-navigation">
          {/* <div>
            <NavToggleButton />
          </div> */}
          <div className="navbar-logo">
            <img id="logo" alt="logo of a lotus flower" src={require('../img/lotus_90.png')} />
            <Link to="/">Meditated</Link>
          </div>
          <div className="spacer" />
          <div className="navbar-nav-items">
            <ul>
              {logInOrOut}
              <li>
                <Link to="/new-moment">New Moment</Link>
              </li>
              <li>
                <Link to="/dashboard">My Moments</Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
