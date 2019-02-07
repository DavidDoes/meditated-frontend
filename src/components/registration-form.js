import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { registerUser } from '../actions/users';
import { login } from '../actions/auth';
import Input from './input';
import { required, nonEmpty, matches, length, isTrimmed } from '../validators';
import '../styles/login-form.css';

import LoginButton from './login-button';

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
    return (
      <form
        className="login-form"
        onSubmit={this.props.handleSubmit(values => {
          this.onSubmit(values);
        })}
      >
        <label htmlFor="username">Username</label>
        <Field component={Input} type="text" name="username" />

        <label htmlFor="password" type="password" name="password">
          Create a password
        </label>
        <Field
          component={Input}
          type="text"
          name="password"
          validate={[required, passwordLength, isTrimmed]}
        />

        <label htmlFor="passwordConfirm" type="password" name="passwordConfirm">
          Confirm Password
        </label>
        <Field
          component={Input}
          type="text"
          name="passwordConfirm"
          validate={[required, nonEmpty, matchesPassword]}
        />

        <button type="submit" disabled={this.props.pristine || this.props.submitting}>
          Register
        </button>
        <LoginButton />
      </form>
    );
  }
}

export default reduxForm({
  form: 'registration',
  onSubmitFail: (errors, dispatch) => dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);
