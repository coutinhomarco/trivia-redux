import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking') || '[]');
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>

        <div id="ranking-titles">
          <p>Colocação</p>
          <p>Pontuação</p>
          <p>Jogador</p>
        </div>
        {
          ranking.map(({ name, score, gravatarEmail }, index) => (
            <tr key={ `${name} + ${score}` } className="feedback-header">
              <td>{ index + 1 }</td>
              <td data-testid={ `player-score-${index}` }>{score}</td>
              <td data-testid={ `player-name-${index}` }>{name}</td>
              <td><img src={ gravatarEmail } alt={ index } /></td>
            </tr>
          ))
        }

        <div>
          <Link to="/">
            <button
              type="button"
              data-testid="btn-go-home"
            >
              Jogar Novamente
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Ranking;
