import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking') || '[]');
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {
          ranking.map(({ name, score, gravatarEmail }, index) => (
            <div key={ `${name} + ${score}` } className="feedback-header">
              <h1>{ index }</h1>
              {/* {
                (index > 0 ? score === ranking[index - 1].score : null)
                  ? <h1>{ index - 1 }</h1>
                  : <h1>{ index }</h1>
              } */}

              <h3 data-testid={ `player-score-${index}` }>{score}</h3>
              <h2 data-testid={ `player-name-${index}` }>{name}</h2>
              <img src={ gravatarEmail } alt={ index } />
            </div>
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
