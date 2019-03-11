import React from 'react';
import '../styles/input.css';

export default class Input extends React.Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.meta.active && this.props.meta.active) {
      this.input.focus();
    }
  }

  render() {
    let error;
    if (this.props.meta.touched && this.props.meta.error) {
      error = <p className="form-error">{this.props.meta.error}</p>;
    }

    let warning;
    if (this.props.meta.touched && this.props.meta.warning) {
      warning = <div className="form-warning">{this.props.meta.warning}</div>;
    }

    return (
      <div className="form-input">
        {warning}
        {error}
        <input
          {...this.props.input}
          id={this.props.input.name}
          type={this.props.type}
          name={this.props.name}
          ref={input => (this.input = input)}
        />
      </div>
    );
  }
}
