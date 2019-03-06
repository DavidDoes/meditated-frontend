import React from 'react';
import { connect } from 'react-redux';
import { getMoments } from '../actions/moments';
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
    // sort moments by date, newest first
    let moments = []
      .concat(this.props.moments)
      .sort((a, b) => a.date < b.date)
      .map(moment => (
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
      ));
    return <div>{moments}</div>;
  }
}

const mapStateToProps = state => ({
  moments: state.moments.moments,
  authToken: state.auth.authToken
});

export default connect(mapStateToProps)(Moments);
