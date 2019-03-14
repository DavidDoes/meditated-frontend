import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HeaderBar from './header-bar';
import LandingPage from './landing-page';
import Dashboard from './dashboard';
import RegistrationPage from './registration-page';
import NewMomentPage from './new-moment-page';
import LoginPage from './login-page';
import PrivateRoute from './private-route';
import { refreshAuthToken } from '../actions/auth';

import '../styles/app.css';

export default class App extends React.Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
      // When we are logged in, refresh the auth token periodically
      this.startPeriodicRefresh();
    } else if (prevProps.loggedIn && !this.props.loggedIn) {
      // Stop refreshing when we log out
      this.stopPeriodicRefresh();
    }
  }

  componentWillUnmount() {
    this.stopPeriodicRefresh();
  }

  startPeriodicRefresh() {
    this.refreshInterval = setInterval(
      () => this.props.dispatch(refreshAuthToken()),
      60 * 60 * 1000 // One hour
    );
  }

  stopPeriodicRefresh() {
    if (!this.refreshInterval) {
      return;
    }

    clearInterval(this.refreshInterval);
  }

  render() {
    return (
      <div className="app">
        <HeaderBar />
        <main>
          <Switch>
            {/* allows for our redirect; use `exact` in routes, otherwise all routes match `/`, only showing that component */}
            <Route exact path="/" component={LandingPage} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/new-moment" component={NewMomentPage} />
            <Route exact path="/register" component={RegistrationPage} />
            <Route exact path="/login" component={LoginPage} />
          </Switch>
        </main>
      </div>
    );
  }
}
