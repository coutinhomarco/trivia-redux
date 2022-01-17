import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

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
    this.setRanking = this.setRanking.bind(this);
  }

  componentDidMount() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    this.setPlayerState(player);
  }

  setPlayerState(player) {
    this.setState(player);
  }

  setRanking() {
    const { name, score, gravatarEmail } = this.props;
    const player = {
      name,
      score,
      gravatarEmail,
    };

    const ranking = JSON.parse(localStorage.getItem('ranking') || '[]');
    ranking.push(player);
    ranking.sort((a, b) => (b.score - a.score));
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  renderMessage() {
    const { assertions } = this.state;
    const MINIMAL_ASSERTIONS = 3;
    let feedbackMessage;
    if (assertions >= MINIMAL_ASSERTIONS) {
      feedbackMessage = <h1 data-testid="feedback-text">Mandou bem!</h1>;
    } else {
      feedbackMessage = <h1 data-testid="feedback-text">Podia ser melhor...</h1>;
    }
    const feedbackInfo = (
      <div className="feedback-container">
        { feedbackMessage }
        {/* <h2 data-testid="feedback-total-score">{score}</h2> */}
        <h2
          data-testid="feedback-total-question"
        >
          {`Acertos: ${assertions}`}
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
          <p data-testid="header-score">{`Pontuação: ${score}`}</p>
        </header>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </button>
        </Link>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ this.setRanking }
          >
            Ranking
          </button>
        </Link>
        { this.renderMessage() }
      </>
    );
  }
}

Feedback.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.login.name,
  score: state.login.score,
  gravatarEmail: state.login.gravatar,
});

export default connect(mapStateToProps, null)(Feedback);
