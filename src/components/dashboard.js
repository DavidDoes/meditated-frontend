import React from 'react';
import Moments from './moments-list';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let successMsg;
    const showSuccessMsg = () => {
      successMsg = (
        <div className="load-msg">
          <h3>You meditated!</h3>
        </div>
      );
    };

    if (this.props.location.state !== undefined) {
      console.log('props:', this.props);
      const fromRedirect = this.props.location.state;
      console.log('fromRedirect', fromRedirect);
      if (fromRedirect) {
        showSuccessMsg();
      }
    }

    return (
      <section className="container">
        <h2 className="page-title">Your Moments</h2>
        {successMsg}
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
              <span className="divTableCell location">Location</span>
              <span className="divTableCell">Mental Distractions</span>
              <span className="divTableCell">Env. Distractions</span>
              <span className="divTableCell edit-column" />
            </div>
            <Moments />
          </div>
        </div>
      </section>
    );
  }
}

export default Dashboard;
