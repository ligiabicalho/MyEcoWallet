import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionCreator, USER_LOGIN } from '../redux/actions';

class Login extends React.Component {
  state = {
    disabled: true,
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
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
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
    const { disabled, email, password } = this.state;
    return (
      <div className="login-page">
        <form>
          <label htmlFor="email">
            E-mail:
            <input
              id="email"
              type="email"
              onChange={ this.handleChange }
              value={ email }
              name="email"
              pattern="/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i"
              title="Invalid email address"
              data-testid="email-input"
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
              // minLength="6"
              // pattern="[0-9a-zA-Z]{6}"
              value={ password }
              onChange={ this.handleChange }
              data-testid="password-input"
              required
            />
          </label>
          <br />
          <button
            type="button"
            disabled={ disabled ? 'disabled' : '' }
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
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null)(Login);
