import React from 'react';
import { connect } from 'react-redux';
// import store from '../store';

import { getMoments } from '../actions/moments';
import moment, { Moment } from './moment';

import '../styles/dashboard.css';

export class Moments extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     moments: []
  //   };
  // }

  componentDidMount() {
    if (this.props.authToken) {
      this.refreshMoments();
    }
  }

  refreshMoments() {
    this.props.dispatch(getMoments(this.props.authToken));
    console.log('<Moments /> this.props:', this.props);
  }

  render() {
    // let moments = this.props.moments.map(moment => {
    return (
      <section className="container">
        <h2 className="page-title">Your Moments</h2>

        <p>
          Use information about each moment to identify locations and times of day where you
          experience the least amount of distraction.
        </p>
        <div id="divTable">
          <div id="moments-list">
            <div id="divTableHeader" className="divTableRow">
              <span className="divTableCell">Date</span>
              <span className="divTableCell">Time</span>
              <span className="divTableCell">Duration</span>
              <span className="divTableCell">Location</span>
              <span className="divTableCell">Mental Distractions</span>
              <span className="divTableCell">Env. Distractions</span>
            </div>
            <Moment
              key={moment.id}
              id={moment.id}
              date={moment.date}
              minutes={moment.minutes}
              time={moment.time}
              location={moment.location}
              mental={moment.mental}
              environmental={moment.environmental}
              refreshMoments={this.refreshMoments.bind(this)}
            />
          </div>
        </div>
      </section>
    );
    // });
    // return <div>{moments}</div>;
  }
}

const mapStateToProps = state => ({
  moments: state.moments.moments,
  authToken: state.auth.authToken
});

export default connect(mapStateToProps)(Moments);
