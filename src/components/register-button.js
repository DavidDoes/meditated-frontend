import React from 'react';
import { Link } from 'react-router-dom';

export default function RegisterButton() {
  return (
    <Link to="/register">
      <button className="log-btn">Get Started for Free</button>
    </Link>
  );
}
