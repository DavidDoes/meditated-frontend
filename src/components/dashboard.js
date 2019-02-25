import React from 'react';
import Moments from './moments-list';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Moments />
      </div>
    );
  }
}

export default Dashboard;
