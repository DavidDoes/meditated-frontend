import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import RegistrationForm from './registration-form';
import '../styles/login-page.css';

export function RegistrationPage(props) {
  const loadMsg = () => {
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
      <h2 className="page-title">Signup</h2>
      {loadMsg()}
      <RegistrationForm />
    </section>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  loading: state.auth.loading
});

export default connect(mapStateToProps)(RegistrationPage);
