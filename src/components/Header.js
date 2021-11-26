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
    dispatchGravatar({ gravatar: gravatarLink });
  }

  render() {
    const { name } = this.props;
    const { gravatarLink } = this.state;
    return (
      <header>
        <img
          src={ gravatarLink }
          data-testid="header-profile-picture"
          alt="Avatar"
        />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">Pontos: 0</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.login.email,
  name: state.login.name,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchGravatar: (state) => dispatch(sendUserInfo(state)),
});

Header.propTypes = {
  dispatchGravatar: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
