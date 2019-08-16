import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import LoginForm from './login-form';
import '../styles/login-page.css';

export function LoginPage(props) {
  const loadMsg = () => {
    console.log(props.loading);
    if (props.loading) {
      return (
        <div className="load-msg">
          <h3>Loading...</h3>
        </div>
      );
    }
  };

  // If we are logged in (which happens automatically when registration
  // is successful) redirect to the user's dashboard
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <section id="form-section">
      <h2 className="page-title">Login</h2>
      {loadMsg()}
      <LoginForm />
    </section>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  loading: state.auth.loading
});

export default connect(mapStateToProps)(LoginPage);
