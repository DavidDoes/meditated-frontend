import React from 'react';
import { connect } from 'react-redux';

import NewMomentForm from './new-moment-form';
import '../styles/new-moment-page.css';

export function NewMomentPage(props) {
  return (
    <section id="form-section">
      <h2 className="page-title">New Moment</h2>
      <NewMomentForm />
    </section>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(NewMomentPage);
