/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
/* eslint-disable jsx-a11y/control-has-associated-label *//* eslint-disable react/no-danger *//* eslint-disable semi */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dispatchGame, sendUserInfo } from '../redux/actions';

const ONE_SECOND = 1000;
const NUMBER_OF_QUESTIONS = 4;
class Trivia extends Component {
  constructor() {
    super();
    this.state = {
      questionIndex: 0,
      points: 0,
      score: 0,
      timer: 30,
      isDisabled: false,
      answer: false,
    };
    this.renderQuestions = this.renderQuestions.bind(this);
    this.renderNextQuestion = this.renderNextQuestion.bind(this);
    this.changeBorderColor = this.changeBorderColor.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.changeLocalStorage = this.changeLocalStorage.bind(this);
    this.renderNextBtn = this.renderNextBtn.bind(this);
    this.renderNextQuestion = this.renderNextQuestion.bind(this);
  }

  componentDidMount() {
    const { login, dispatchRequest } = this.props;
    const { name, gravatar: gravatarEmail } = login;
    const { points } = this.state;
    this.startTimer();
    dispatchRequest();
    const state = {
      player: {
        name,
        assertions: points,
        score: 0,
        gravatarEmail,
      },
    };
    localStorage.setItem('state', JSON.stringify(state));
  }

  changeLocalStorage() {
    const { login } = this.props;
    const { name, gravatar: gravatarEmail } = login;
    const { points, score } = this.state;
    const state = {
      player: {
        name,
        assertions: points,
        score,
        gravatarEmail,
      },
    };
    localStorage.setItem('state', JSON.stringify(state));
  }

  stopTimer() {
    this.setState({
      answer: true,
    });
  }

  startTimer() {
    const timerInterval = setInterval(() => {
      const { timer, answer } = this.state;
      if (timer === 0 || answer) {
        clearInterval(timerInterval);
        this.setState({
          isDisabled: true,
          answer: false,

        });
      } else {
        this.setState((prevState) => ({
          timer: prevState.timer - 1,
        }));
      }
    }, ONE_SECOND);
  }

  resetBorderColor() {
    const correctAnswer = document.querySelector('.correct-answer');
    const incorrectAnswers = [
      ...document.getElementsByClassName('incorrect-answer'),
    ];
    correctAnswer.style.border = '3px solid black';
    incorrectAnswers.forEach((incorrectAnswer) => {
      incorrectAnswer.style.border = '3px solid black';
    });
  }

  changeBorderColor() {
    const correctAnswer = document.querySelector('.correct-answer');
    const incorrectAnswers = [
      ...document.getElementsByClassName('incorrect-answer'),
    ];
    correctAnswer.style.border = '3px solid rgb(6, 240, 15)';
    incorrectAnswers.forEach((incorrectAnswer) => {
      incorrectAnswer.style.border = '3px solid red';
    });
  }

  checkAnswer(answer, questions, questionIndex) {
    this.stopTimer();
    this.changeBorderColor();
    this.setState({
      isDisabled: false,
    });
    const { timer } = this.state;
    if (questions[questionIndex].correct_answer === answer) {
      const { difficulty } = questions[questionIndex];
      const checkDifficulty = {
        easy: 1,
        medium: 2,
        hard: 3,
      };
      const basePoints = 10;
      const correctCalc = basePoints + (checkDifficulty[difficulty] * timer);
      this.setState(
        (prevState) => ({
          points: prevState.points + 1,
          score: prevState.score + correctCalc,
        }), () => {
          const { points, score } = this.state;
          const { dispatchAssertions } = this.props;
          dispatchAssertions({ assertions: points, score });
          this.changeLocalStorage();
        },
      );
    }
  }

  renderNextBtn() {
    const { questionIndex } = this.state;
    return (
      <button
        type="button"
        onClick={ () => this.renderNextQuestion(questionIndex) }
        data-testid="btn-next"
      >
        Próximo
      </button>
    );
  }

  renderNextQuestion(questionIndex) {
    this.resetBorderColor();
    if (questionIndex <= NUMBER_OF_QUESTIONS) {
      this.setState(
        (prevState) => ({
          questionIndex: prevState.questionIndex + 1,
          timer: 30,
          isDisabled: false,
        }), this.startTimer(),
      );
    }
  }

  renderQuestions() {
    const { questionIndex, isDisabled } = this.state;
    const { questions, history } = this.props;
    if (questionIndex <= NUMBER_OF_QUESTIONS) {
      const correctAnswer = questions[questionIndex].correct_answer;
      const incorrectAnswers = questions[questionIndex].incorrect_answers;
      const innerHTML2 = {
        __html: questions[questionIndex].question,
      }
      const answers = [...incorrectAnswers, correctAnswer];
      return (
        <>
          <p data-testid="question-category">{questions[questionIndex].category}</p>
          <p data-testid="question-text" dangerouslySetInnerHTML={ innerHTML2 } />
          <div className="answers-container">
            {answers.sort().map((answer, index) => {
              const innerHTML = {
                __html: answer,
              };
              if (answer === correctAnswer) {
                return (
                  (
                    <button
                      className="correct-answer"
                      key={ index }
                      onClick={ () => this.checkAnswer(answer, questions, questionIndex) }
                      type="button"
                      data-testid="correct-answer"
                      disabled={ isDisabled }
                      dangerouslySetInnerHTML={ innerHTML }
                    />
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
                  disabled={ isDisabled }
                >
                  {answer}
                </button>
              );
            })}
          </div>
          { isDisabled ? this.renderNextBtn() : null }
        </>
      );
    } history.push('/feedback');
  }

  render() {
    const { questions } = this.props;
    const { timer } = this.state;
    return (
      <section>
        <div>{ timer }</div>
        { questions ? this.renderQuestions() : null }
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
    name: PropTypes.string,
  }).isRequired,
  questions: PropTypes.arrayOf().isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
