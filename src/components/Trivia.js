import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dispatchGame, sendUserInfo } from '../redux/actions';

class Trivia extends Component {
  constructor() {
    super();
    this.state = {
      questionIndex: 0,
      points: 0,

    };
    this.renderQuestions = this.renderQuestions.bind(this);
    this.changeBorderColor = this.changeBorderColor.bind(this);
  }

  componentDidMount() {
    const { dispatchRequest } = this.props;
    dispatchRequest();
  }

  componentWillUnmount() {
    const { login } = this.props;
    const { userName, assertions, gravatar: gravatarEmail } = login;
    const player = {
      name: userName,
      assertions,
      score: '0',
      gravatarEmail,
    };
    localStorage.setItem('player', JSON.stringify(player));
  }

  changeBorderColor() {
    const correctAnswer = document.getElementsByClassName('correct-answer');
    const incorrectAnswers = [
      ...document.getElementsByClassName('incorrect-answer'),
    ];
    correctAnswer[0].className = 'correct-answer-color';
    incorrectAnswers.forEach((incorrectAnswer) => {
      incorrectAnswer.className = 'incorrect-answer-color';
    });
  }

  checkAnswer(answer, questions, questionIndex) {
    this.changeBorderColor();
    if (questions[questionIndex].correct_answer === answer) {
      this.setState(
        (prevState) => ({
          points: prevState.points + 1,
        }), () => {
          const { points } = this.state;
          const { dispatchAssertions } = this.props;
          dispatchAssertions({ assertions: points });
        },
      );
    }
  }

  renderQuestions() {
    const { questionIndex } = this.state;
    const { questions } = this.props;
    const correctAnswer = questions[questionIndex].correct_answer;
    const incorrectAnswers = questions[questionIndex].incorrect_answers;
    const answers = [
      ...incorrectAnswers,
      correctAnswer,
    ];
    return (
      <>
        <p data-testid="question-category">{questions[questionIndex].category}</p>
        <p data-testid="question-text">{questions[questionIndex].question}</p>
        {answers.sort().map((answer, index) => {
          if (answer === correctAnswer) {
            return (
              (
                <button
                  className="correct-answer"
                  key={ index }
                  onClick={ () => this.checkAnswer(answer, questions, questionIndex) }
                  type="button"
                  data-testid="correct-answer"
                >
                  {answer}
                </button>
              )
            );
          }
          return (
            <button
              className="incorrect-answer"
              key={ index }
              onClick={ () => this.checkAnswer(answer, questions, questionIndex) }
              type="button"
              data-testid={ `wrong-answer-${incorrectAnswers.indexOf(answer)}` }
            >
              {answer}
            </button>
          );
        })}
      </>
    );
  }

  render() {
    const { questions } = this.props;
    return (
      <section>
        {
          questions ? this.renderQuestions() : null
        }

      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchRequest: () => dispatch(dispatchGame()),
  dispatchAssertions: (state) => dispatch(sendUserInfo(state)),
});

const mapStateToProps = (state) => ({
  login: state.login,
  questions: state.trivia.questions,
});

Trivia.propTypes = {
  dispatchAssertions: PropTypes.func.isRequired,
  dispatchRequest: PropTypes.func.isRequired,
  login: PropTypes.shape({
    assertions: PropTypes.number,
    gravatar: PropTypes.string,
    gravatarEmail: PropTypes.string,
    userName: PropTypes.string,
  }).isRequired,
  questions: PropTypes.arrayOf().isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
