import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/Header.css';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <div className="header">
        <div className="header-email" data-testid="email-field">{email}</div>
        <div className="header-total">
          Despesa total:
          <span data-testid="total-field"> 0</span>
          <span data-testid="header-currency-field"> BRL</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  email: user.email,
});

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string }),
}.isRequired;

export default connect(mapStateToProps)(Header);
