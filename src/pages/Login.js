import React, { Component } from 'react';
import { connect } from 'react-redux';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      email: '',
      isDisabled: true,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.activateButton = this.activateButton.bind(this);
    this.checkIfAllFulfilled = this.checkIfAllFulfilled.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
  }

  onInputChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, this.activateButton);
  }

  activateButton() {
    if (this.checkIfAllFulfilled() && this.checkEmail()) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  checkEmail() {
    const { email } = this.state;
    const emailFormatRegex = /\S+@\S+\.\S+/;
    const verifyIfIsValid = emailFormatRegex.test(email);

    if (verifyIfIsValid) {
      return true;
    }
    return false;
  }

  checkIfAllFulfilled() {
    const { userName, email } = this.state;

    if (userName && email) {
      return true;
    } return false;
  }

  render() {
    const { userName, email, isDisabled } = this.state;
    return (
      <form className="login-form" onChange={ this.onInputChange }>
        <label htmlFor="name">
          <input
            data-testid="input-player-name"
            id="name"
            name="userName"
            type="text"
            required
            value={ userName }
          />
        </label>

        <label htmlFor="email">
          <input
            data-testid="input-gravatar-email"
            id="email"
            name="email"
            type="email"
            required
            value={ email }
          />
        </label>

        <button
          className="login-form-button"
          disabled={ isDisabled }
          data-testid="btn-play"
          type="submit"
        >
          Jogar
        </button>
      </form>
    );
  }
}

export default connect(null, null)(Login);
