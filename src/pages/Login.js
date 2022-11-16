import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionCreator, USER_LOGIN } from '../redux/actions';
import '../styles/Login.css';

class Login extends React.Component {
  state = {
    disable: true,
    email: '',
    password: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validation());
  };

  validation = () => {
    const { password, email } = this.state;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
    const minPass = 5;
    const validPass = password.length > minPass;
    if (emailRegex.test(email)
        && validPass) {
      this.setState({
        disable: false,
      });
    } else {
      this.setState({
        disable: true,
      });
    }
  };

  handleClick = () => {
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(actionCreator(USER_LOGIN, email));
    history.push('/carteira');
  };

  render() {
    const { disable, email, password } = this.state;
    return (
      <div className="login-page">
        <h1>Trybe Wallet</h1>
        <form>
          <label htmlFor="email">
            E-mail:
            <input
              id="email"
              name="email"
              type="email"
              value={ email }
              data-testid="email-input"
              onChange={ this.handleChange }
              // pattern="/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i"
              required
            />
          </label>
          <br />
          <label htmlFor="password">
            Senha:
            <input
              id="password"
              name="password"
              type="password"
              value={ password }
              data-testid="password-input"
              onChange={ this.handleChange }
              // minLength="6"
              // pattern="[0-9a-zA-Z]{6}"
              required
            />
          </label>
          <br />
          <button
            type="button"
            disabled={ disable }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}
Login.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(null)(Login);
