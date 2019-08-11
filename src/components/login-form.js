import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import Input from './input';
import { login } from '../actions/auth';
import { required, nonEmpty } from '../validators';

import RegisterButton from './register-button';

import '../styles/login-form.css';

export class LoginForm extends React.Component {
  onSubmit(values) {
    return this.props.dispatch(login(values.username, values.password));
  }

  render() {
    let error;
    if (this.props.error) {
      error = (
        <div>
          <p className="form-error" aria-live="polite">
            {this.props.error}
          </p>
        </div>
      );
    }

    return (
      <form
        className="login-form"
        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
      >
        {error}

        <label htmlFor="username">Username</label>
        <span className="demouser">Demo Username: demouser</span>
        <Field
          component={Input}
          type="text"
          name="username"
          id="username"
          validate={[required, nonEmpty]}
        />
        <label htmlFor="password">Password</label>
        <span className="demouser">Demo Password: password10</span>
        <Field
          component={Input}
          type="password"
          name="password"
          id="password"
          validate={[required, nonEmpty]}
        />
        <button className="main-btn" disabled={this.props.pristine || this.props.submitting}>
          Login
        </button>
        <RegisterButton />
      </form>
    );
  }
}

export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);
