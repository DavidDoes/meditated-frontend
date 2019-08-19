import React from 'react';
import { connect } from 'react-redux';

import NewMomentForm from './new-moment-form';

export function NewMomentPage(props) {
  const loadMsg = () => {
    if (props.loading) {
      return (
        <div className="load-msg">
          <h3>Loading...</h3>
        </div>
      );
    }
  };

  return (
    <section id="form-section">
      <h2 className="page-title">New Moment</h2>
      {loadMsg()}
      <NewMomentForm />
    </section>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  loading: state.auth.loading
});

export default connect(mapStateToProps)(NewMomentPage);
