import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5'

class Header extends Component {
  render() {
    const { email, name } = this.props;
    const hashGerada = md5(email).toString();
    return (
      <header>
        {/* <img src={`https://www.gravatar.com/avatar/${hashGerada}`} data-testid="header-profile-picture"/> */}
        <p data-testid="header-player-name">jaksj</p>
        <p data-testid="header-score">0</p>
      </header>
    )
  }
}

const mapStateToProps = (state) =>({
  email: state.login.email,
  name: state.login.name,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default connect()(Header);