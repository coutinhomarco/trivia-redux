import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAPI } from '../services';
import { sendToken, sendUserInfo } from '../redux/actions';
// import { GamePage } from '../pages/GamePage';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      score: 0,
      assertions: 0,
      isDisabled: true,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.activateButton = this.activateButton.bind(this);
    this.checkIfAllFulfilled = this.checkIfAllFulfilled.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
    this.onSubmitClick = this.onSubmitClick.bind(this);
    this.onSettingsClick = this.onSettingsClick.bind(this);
  }

  onInputChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, this.activateButton);
  }

  onSettingsClick() {
    const { history } = this.props;
    history.push('/settings');
  }

  async onSubmitClick(e) {
    e.preventDefault();
    const { dispatchToken, dispatchUserInfo, history } = this.props;
    const { userName, email } = this.state;
    const response = await fetchAPI();
    const { token } = response;
    const userState = {
      player: {
        name: userName,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('token', token);
    localStorage.setItem('state', userState);
    dispatchUserInfo(this.state);
    dispatchToken(token);
    history.push('/game');
  }

  checkIfAllFulfilled() {
    const { name, email } = this.state;

    if (name && email) {
      return true;
    } return false;
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

  activateButton() {
    if (this.checkIfAllFulfilled() && this.checkEmail()) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  render() {
    const { name, email, isDisabled } = this.state;
    return (
      <form className="login-form" onChange={ this.onInputChange }>
        <label htmlFor="name">
          <input
            data-testid="input-player-name"
            id="name"
            name="name"
            type="text"
            required
            defaultValue={ name }
          />
        </label>

        <label htmlFor="email">
          <input
            data-testid="input-gravatar-email"
            id="email"
            name="email"
            type="email"
            required
            defaultValue={ email }
          />
        </label>

        <button
          className="login-form-button"
          disabled={ isDisabled }
          data-testid="btn-play"
          type="submit"
          onClick={ this.onSubmitClick }
        >
          Jogar
        </button>

        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.onSettingsClick }
        >
          Configurações
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatchToken: PropTypes.func.isRequired,
  dispatchUserInfo: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchToken: (token) => dispatch(sendToken(token)),
  dispatchUserInfo: (state) => dispatch(sendUserInfo(state)),
});

export default connect(null, mapDispatchToProps)(Login);
