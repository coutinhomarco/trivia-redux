import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Trivia from '../components/Trivia';

class GamePage extends Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <Header />
        <Trivia history={ history } />
      </>
    );
  }
}

GamePage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(GamePage);
