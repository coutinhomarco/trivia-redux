import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { sendUserInfo } from '../redux/actions';

class Header extends Component {
  constructor(props) {
    super(props);
    const { email } = this.props;
    const hashGerada = md5(email).toString();
    this.state = ({
      gravatarLink: `https://www.gravatar.com/avatar/${hashGerada}`,
    });
  }

  componentDidMount() {
    const { dispatchGravatar } = this.props;
    const { gravatarLink } = this.state;
    console.log(this.props);
    dispatchGravatar({ gravatar: gravatarLink });
  }

  render() {
    const { name, score } = this.props;
    const { gravatarLink } = this.state;
    return (
      <header>
        <img
          src={ gravatarLink }
          data-testid="header-profile-picture"
          alt="Avatar"
        />
        <p data-testid="header-player-name">{`Jogador: ${name}`}</p>
        <p data-testid="header-score">
          {`Pontos: ${score}` }
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.login.email,
  name: state.login.name,
  score: state.login.score,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchGravatar: (state) => dispatch(sendUserInfo(state)),
});

Header.propTypes = {
  dispatchGravatar: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
