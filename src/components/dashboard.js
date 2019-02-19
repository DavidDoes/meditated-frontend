import React from 'react';
import store from '../store';

import '../styles/dashboard.css';

let currentState = store.getState();

const dummyData = [
  {
    minutes: '10',
    location: 'Bedroom',
    date: 'January 2, 2019',
    time: '10:00 AM',
    mental: '2',
    environmental: '1'
  },
  {
    minutes: '5',
    location: 'Living Room',
    date: 'January 3, 2019',
    time: '8:00 AM',
    mental: '3',
    environmental: '1'
  },
  {
    minutes: '5',
    location: 'Break Room',
    date: 'January 3, 2019',
    time: '12:05 PM',
    mental: '4',
    environmental: '4'
  },
  {
    minutes: '15',
    location: 'Living Room',
    date: 'January 3, 2019',
    time: '5:00 PM',
    mental: '4',
    environmental: '1'
  },
  {
    minutes: '20',
    location: 'Bedroom',
    date: 'January 4, 2019',
    time: '6:00 PM',
    mental: '1',
    environmental: '1'
  },
  {
    minutes: '5',
    location: 'Work Desk',
    date: 'January 5, 2019',
    time: '9:30 AM',
    mental: '2',
    environmental: '3'
  }
];

export default function Moments() {
  let moment = [];

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
            <span className="divTableCell">Location</span>
            <span className="divTableCell">Mental Distractions</span>
            <span className="divTableCell">Env. Distractions</span>
          </div>
          {
            (moment = dummyData.map(function(item, i) {
              moment = item;
              // in production, should instead reference another component or function that gets data from server
              return (
                <div className="divTableRow" key={i}>
                  <span className="divTableCell">{moment.date}</span>
                  <span className="divTableCell">{moment.time}</span>
                  <span className="divTableCell">{moment.location}</span>
                  <span className="divTableCell">{moment.mental}</span>
                  <span className="divTableCell">{moment.environmental}</span>
                  <span className="divTableCell">
                    <button>Edit</button>
                    <button>Delete</button>
                  </span>
                </div>
              );
            }))
          }
        </div>
      </div>
    </section>
  );
}
