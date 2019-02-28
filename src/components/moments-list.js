import React from 'react';
import { connect } from 'react-redux';
// import store from '../store';

import { getMoments } from '../actions/moments';
// import moment, { Moment } from './moment';
import Moment from './moment';

import '../styles/dashboard.css';

class Moments extends React.Component {
  componentDidMount() {
    if (this.props.authToken) {
      this.refreshMoments();
    }
  }

  refreshMoments() {
    this.props.dispatch(getMoments(this.props.authToken));
  }

  render() {
    let moments = this.props.moments.map(moment => {
      return (
        <Moment
          key={moment.id}
          id={moment.id}
          date={moment.date}
          time={moment.time}
          minutes={moment.minutes}
          location={moment.location}
          mental={moment.mental}
          environmental={moment.environmental}
          refreshMoments={this.refreshMoments.bind(this)}
        />
      );
    });
    return <div>{moments}</div>;
  }
}

const mapStateToProps = state => ({
  moments: state.moments.moments,
  authToken: state.auth.authToken
});

export default connect(mapStateToProps)(Moments);
