import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/WalletForm.css';
import { actionCreator, actionFetchExchangeRates, WALLET_ADD } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: '',
    method: '',
    tag: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleAddExpenses = async () => {
    const { isFetching, expenses, dispatch } = this.props;
    const exchangeRates = await dispatch(actionFetchExchangeRates());
    if (!isFetching) {
      if (expenses.length > 0) {
        const lastIndex = -1;
        const lastExpense = expenses.slice(lastIndex)[0];
        const nextID = lastExpense.id + 1;
        const addExpense = { id: nextID, ...this.state, exchangeRates };
        dispatch(actionCreator(WALLET_ADD, addExpense));
      } else {
        const addExpense = { id: 0, ...this.state, exchangeRates };
        dispatch(actionCreator(WALLET_ADD, addExpense));
      }
    }
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div className="wallet-form">
        <form>
          <label htmlFor="value-input">
            Valor da despesa:
            <input
              type="number"
              id="value-input"
              name="value"
              value={ value }
              onChange={ this.handleChange }
              data-testid="value-input"
              required
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              id="description"
              name="description"
              value={ description }
              onChange={ this.handleChange }
              data-testid="description-input"
              required
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              id="currency"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
              data-testid="currency-input"
              required
            >
              <option value="select">
                Selecione
              </option>
              {currencies.map((curr, i) => (
                <option key={ i } value={ curr }>
                  {curr}
                </option>
              ))}

            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento:
            <select
              id="method"
              name="method"
              value={ method }
              onChange={ this.handleChange }
              data-testid="method-input"
              required
            >
              <option value="select">
                Selecione
              </option>
              <option value="Dinheiro">
                Dinheiro
              </option>
              <option value="Cartão de crédito">
                Cartão de crédito
              </option>
              <option value="Cartão de débito">
                Cartão de débito
              </option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria:
            <select
              id="tag"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
              data-testid="tag-input"
              required
            >
              <option value="select">
                Selecione
              </option>
              <option value="Alimentação">
                Alimentação
              </option>
              <option value="Lazer">
                Lazer
              </option>
              <option value="Trabalho">
                Trabalho
              </option>
              <option value="Transporte">
                Transporte
              </option>
              <option value="Saúde">
                Saúde
              </option>
            </select>
          </label>
          <button
            type="button"
            disabled={
              (value && description && currency && method && tag)
                ? ''
                : 'disabled'
            }
            onClick={ this.handleAddExpenses }
          >
            Adicionar despesa

          </button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf,
  expenses: PropTypes.arrayOf,
  dispatch: PropTypes.func,
  isFetching: PropTypes.bool,
}.isRequired;

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  expenses: wallet.expenses,
  isFetching: wallet.isFetching,
});

export default connect(mapStateToProps)(WalletForm);
