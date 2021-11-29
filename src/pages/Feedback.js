import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      score: 0,
      gravatarEmail: '',
      assertions: 0,
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
    const { assertions, score } = this.state;
    const MINIMAL_ASSERTIONS = 3;
    let feedbackMessage;
    if (assertions >= MINIMAL_ASSERTIONS) {
      feedbackMessage = <h1 data-testid="feedback-text">Mandou bem!</h1>;
    } else {
      feedbackMessage = <h1 data-testid="feedback-text">Podia ser melhor...</h1>;
    }
    const feedbackInfo = (
      <div className="feeback-container">
        { feedbackMessage }
        <h2 data-testid="feedback-total-score">{score}</h2>
        <h2
          data-testid="feedback-total-question"
        >
          {assertions}
        </h2>
      </div>
    );
    return feedbackInfo;
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
        <Link to="/">
          <button type="button" data-testid="btn-play-again">Jogar novamente</button>
        </Link>
        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">Ranking</button>
        </Link>
        { this.renderMessage() }
      </>
    );
  }
}

export default Feedback;
