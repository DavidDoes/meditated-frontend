import React from 'react';
import { connect } from 'react-redux';

import '../styles/moment.css';
import UpdateMoment from './updateMoment';
import { deleteMoment } from '../actions/moments';

export class Moment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFields: false
    };
  }

  // componentDidMount() {
  //   console.log('<Moment /> this.props', this.props);
  // }

  updateMomentDetails(toggle) {
    this.setState({
      showFields: toggle
    });
  }

  toggleShowFields(toggle) {
    this.setState({
      showFields: toggle
    });
  }

  deleteMoment() {
    this.props.dispatch(deleteMoment(this.props.authToken, this.props.id));
  }

  render() {
    if (!this.state.showFields) {
      return (
        <div className="divTableRow">
          <span className="divTableCell">{this.props.date}</span>
          <span className="divTableCell">{this.props.time}</span>
          <span className="divTableCell">{this.props.minutes}</span>
          <span className="divTableCell location">{this.props.location}</span>
          <span className="divTableCell">{this.props.mental}</span>
          <span className="divTableCell">{this.props.environmental}</span>
          <span className="divTableCell edit-column">
            <button onClick={() => this.toggleShowFields(true)}>Edit</button>
            <button
              onClick={e => {
                if (window.confirm('Are you sure you wish to delete this moment?'))
                  this.deleteMoment(e);
              }}
            >
              Delete
            </button>
          </span>
        </div>
      );
    } else {
      return (
        <UpdateMoment
          id={this.props.id}
          date={this.props.date}
          minutes={this.props.minutes}
          time={this.props.time}
          location={this.props.location}
          mental={this.props.mental}
          environmental={this.props.environmental}
          toggleShowFields={this.toggleShowFields.bind(this)}
          refreshMoments={this.props.refreshMoments}
        />
      );
    }
  }
}

const mapStateToProps = state => ({
  moments: state.moments,
  authToken: state.auth.authToken
});

export default connect(mapStateToProps)(Moment);
