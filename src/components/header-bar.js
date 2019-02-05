import React from 'react';
import { connect } from 'react-redux';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';

import '../styles/header-bar.css';

export class HeaderBar extends React.Component {
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render() {
    // Only render the log out button if we are logged in
    let logOutButton;
    if (this.props.loggedIn) {
      logOutButton = <button onClick={() => this.logOut()}>Log out</button>;
    }
    return (
      <header className="navbar">
        <nav className="navbar-navigation">
          {/* <div>
            <NavToggleButton />
          </div> */}
          <div className="navbar-logo">
            <img id="logo" alt="logo of a lotus flower" src={require('../img/lotus_90.png')} />
            <a href="/">Meditated</a>{' '}
          </div>
          <div className="spacer" />
          <div className="navbar-nav-items">
            <ul>
              <li>
                <a href="/login">Login</a>
              </li>
              {logOutButton}
              <li>
                <a href="/new-moment">New Moment</a>
              </li>
              <li>
                <a href="/moments">My Moments</a>
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
