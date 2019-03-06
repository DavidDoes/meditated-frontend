import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import RegisterButton from './register-button';

import '../styles/landing-page.css';

export function LandingPage(props) {
  // If we are logged in redirect straight to the user's dashboard
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }

  const scrollDown = () => {
    document.getElementById('about').scrollIntoView({
      behavior: 'smooth'
    });
  };

  const scrollUp = () => {
    document.getElementById('root').scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <div>
      <section id="tagline">
        <h1>simplify your meditation</h1>
        <p>simple, distraction-free meditation tracking</p>
        <i onClick={scrollDown} className="fas fa-angle-down" />
      </section>

      <section id="about">
        <i onClick={scrollUp} className="fas fa-angle-up" />

        <div>
          <p>The secret to a strong healthy habit is consistency.</p>
          <p>Use Meditated to keep track of your meditation habit.</p>

          <RegisterButton />
        </div>
        <sub>
          Logo by <a href="https://www.flaticon.com/authors/eleonor-wang">Eleanor Wang</a>
        </sub>
      </section>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
