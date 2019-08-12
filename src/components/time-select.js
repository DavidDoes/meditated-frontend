import React from 'react';
import { connect } from 'react-redux';
import { getMoments } from '../actions/moments';

class TimeSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: this.props.time
    };
  }

  componentDidMount() {
    if (this.props.authToken) {
      getMoments(this.props.authToken);
    }
  }

  render() {
    // let momentsList = [];
    // this.props.moments.forEach(({ id, location }) => momentsList.push({ id, location }));

    const optionsArray = [
      { value: 'Early Morning', label: 'Early Morning' },
      { value: 'Morning', label: 'Morning' },
      { value: 'Afternoon', label: 'Afternoon' },
      { value: 'Evening', label: 'Evening' },
      { value: 'Bedtime', label: 'Bedtime' }
    ];

    const options = optionsArray.map(opt => <option key={opt.label}>{opt.value}</option>);

    // store locations to state
    return (
      <div>
        <select value={this.state.time} onChange={event => this.props.handleTime(event, 'time')}>
          {options}
        </select>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  moments: state.moments.moments,
  authToken: state.auth.authToken
});

export default connect(mapStateToProps)(TimeSelect);
