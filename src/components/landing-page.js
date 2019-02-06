import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { animateScroll, Link as animatedLink } from 'react-scroll';

import '../styles/landing-page.css';

const SignupButton = () => {
  return (
    <Link to="/register">
      <button>Get Started for Free</button>
    </Link>
  );
};

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
        <i onClick={scrollDown} class="fas fa-angle-down" />
        {/* <animatedLink target={'#about'} smooth={true} duration={6000}>
          <i class="fas fa-angle-down" />
        </animatedLink> */}
      </section>

      <section id="about">
        <i onClick={scrollUp} class="fas fa-angle-up" />

        <div>
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
