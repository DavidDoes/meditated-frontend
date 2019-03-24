import React from 'react';
import { Link } from 'react-router-dom';

export default function RegisterButton() {
  return (
    <Link to="/register">
      <button className="main-btn">Get Started</button>
    </Link>
  );
}
