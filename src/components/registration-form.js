import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { registerUser } from '../actions/users';
import { login } from '../actions/auth';
import Input from './input';
import { required, nonEmpty, matches, length, isTrimmed } from '../validators';
import LoginButton from './login-button';

import '../styles/login-form.css';

const passwordLength = length({ min: 10, max: 72 });
const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {
  onSubmit(values) {
    const { username, password, firstName, lastName } = values;
    const user = { username, password, firstName, lastName };
    return this.props
      .dispatch(registerUser(user))
      .then(() => this.props.dispatch(login(username, password)));
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
        <Field component={Input} type="text" name="username" />

        <label htmlFor="password" type="password" name="password">
          Create a Password
        </label>
        <Field
          component={Input}
          type="password"
          name="password"
          validate={[required, passwordLength, isTrimmed]}
        />

        <label htmlFor="passwordConfirm" type="password" name="passwordConfirm">
          Confirm Password
        </label>
        <Field
          component={Input}
          type="password"
          name="passwordConfirm"
          validate={[required, nonEmpty, matchesPassword]}
        />

        <button
          className="main-btn"
          type="submit"
          disabled={this.props.pristine || this.props.submitting}
        >
          Register
        </button>
        <LoginButton />
      </form>
    );
  }
}

export default reduxForm({
  form: 'registration',
  onSubmitFail: (errors, dispatch) => dispatch(focus('registration'))
})(RegistrationForm);
