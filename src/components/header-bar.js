import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import RegisterButton from './register-button';

import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';

import '../styles/header-bar.css';

export class HeaderBar extends React.Component {
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  logIn() {
    return <Link to="/login">Login</Link>;
  }

  render() {
    // Only render logout if we are logged in,
    // else render login
    let logInOrOut;
    if (this.props.loggedIn) {
      logInOrOut = (
        <ul>
          <li>
            <button className="log-btn" onClick={() => this.logOut()}>
              Logout
            </button>
          </li>
          <li>
            <Link to="/new-moment">New Moment</Link>
          </li>
          <li>
            <Link to="/dashboard">My Moments</Link>
          </li>
        </ul>
      );
    } else {
      logInOrOut = (
        <ul>
          <li>
            <Link to="/login">
              <button type="button" className="log-btn">
                Login
              </button>
            </Link>
          </li>
          <li>
            <RegisterButton />
          </li>
        </ul>
      );
    }

    return (
      <header className="navbar">
        <nav className="navbar-navigation">
          <div className="navbar-logo">
            <img id="logo" alt="logo of a lotus flower" src={require('../img/lotus_90.png')} />
            <Link to="/">Meditated</Link>
          </div>
          <div className="spacer" />
          <div className="navbar-nav-items">{logInOrOut}</div>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
