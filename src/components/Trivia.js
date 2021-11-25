import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dispatchGame } from '../redux/actions';

class Trivia extends Component {
  constructor() {
    super();
    this.state = {
      questionIndex: 0,
      points: 0,

    };
    this.renderQuestions = this.renderQuestions.bind(this);
  }

  componentDidMount() {
    const { dispatchRequest } = this.props;
    dispatchRequest();
  }

  checkAnswer(answer, questions, questionIndex) {
    if (questions[questionIndex].correct_answer === answer) {
      this.setState(
        (prevState) => ({
          points: prevState.points + 1,
        }),
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
});

const mapStateToProps = (state) => ({
  questions: state.trivia.questions,
});

Trivia.propTypes = {
  dispatchRequest: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf().isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
