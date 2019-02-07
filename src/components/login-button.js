import React from 'react';
import { Link } from 'react-router-dom';

export default function LoginButton() {
  return (
    <Link to="/login">
      <button>Login</button>
    </Link>
  );
}
