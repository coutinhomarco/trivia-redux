import React, { Component } from 'react';

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      score: 0,
      gravatarEmail: '',
    };
    this.setPlayerState = this.setPlayerState.bind(this);
    this.renderMessage = this.renderMessage.bind(this);
  }

  componentDidMount() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    this.setPlayerState(player);
  }

  setPlayerState(player) {
    this.setState(player);
  }

  renderMessage() {
    const { assertions } = this.state;
    const MINIMAL_ASSERTIONS = 3;
    if (assertions >= MINIMAL_ASSERTIONS) {
      return (
        <h1 data-testid="feedback-text">Mandou bem!</h1>
      );
    }
    return (
      <h1 data-testid="feedback-text">Podia ser melhor...</h1>
    );
  }

  render() {
    const { gravatarEmail, name, score } = this.state;
    return (
      <>
        <header>
          <p data-testid="feedback-text">Tente novamente</p>
          <img
            src={ `https://www.gravatar.com/avatar/${gravatarEmail}` }
            data-testid="header-profile-picture"
            alt="Gravatar"
          />
          <p data-testid="header-player-name">{name}</p>
          <p data-testid="header-score">{score}</p>
        </header>
        { this.renderMessage()}
      </>
    );
  }
}

export default Feedback;
