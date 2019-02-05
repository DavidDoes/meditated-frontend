import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import '../styles/landing-page.css';

const SignupButton = () => {
  return (
    <Link to="/register">
      <button>Signup</button>
    </Link>
  );
};

export function LandingPage(props) {
  // If we are logged in redirect straight to the user's dashboard
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div>
      <section id="tagline">
        <h1>simplify your meditation</h1>
        <p>simple, distraction-free meditation tracking</p>
        <i class="fas fa-angle-down" />
      </section>

      <section id="about">
        <div>
          <p>
            You don't need expensive subscriptions to meditate.
            <br /> You can do it right now.
          </p>
          <p>The secret to a strong healthy habit is consistency.</p>
          <p>Use Meditated to keep track of your meditation habit.</p>

          <SignupButton />
        </div>
      </section>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
