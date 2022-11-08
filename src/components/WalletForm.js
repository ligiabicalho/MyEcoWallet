import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/WalletForm.css';
import { actionCreator, actionFetchExchangeRates, WALLET_ADD,
  WALLET_UPDATE } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidUpdate(prevProps) {
    const { editor, idToEdit } = this.props;
    if (editor && !prevProps.editor) { // !prevProps.editor evita loop infinito!!
      this.valuesToEdit(idToEdit);
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  valuesToEdit = (id) => {
    const { expenses } = this.props;
    const prevValues = expenses.find((expense) => expense.id === id);
    this.setState({
      value: prevValues.value,
      description: prevValues.description,
      currency: prevValues.currency,
      method: prevValues.method,
      tag: prevValues.tag,
    });
  };

  editExpense = (idToEdit) => {
    const { dispatch } = this.props;
    dispatch(actionCreator(WALLET_UPDATE, { id: idToEdit, ...this.state }));
  };

  handleAddExpenses = async () => {
    const { expenses, dispatch, editor, idToEdit } = this.props;
    const exchangeRates = await dispatch(actionFetchExchangeRates());
    if (!editor) {
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
    } else {
      this.editExpense(idToEdit);
    }
  };
  // slice, find, filter... cuidado ao usar! Não cria um array novo, mantém a referência no anterior, isso pode causar problemas. Ex: vc edita o retorno do método, o array parece atualizado, mas o JS não interpreta que mudou, não renderiza novamente o componente com os novos dados.

  render() {
    const { currencies, editor } = this.props;
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
            id="btn-add"
            type="button"
            disabled={
              (value && description && currency && method && tag)
                ? ''
                : 'disabled'
            }
            onClick={ this.handleAddExpenses }
          >
            {editor ? 'Editar despesa' : 'Adicionar despesa'}
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
  editor: PropTypes.bool,
  idToEdit: PropTypes.number,
}.isRequired;

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  expenses: wallet.expenses,
  editor: wallet.editor,
  idToEdit: wallet.idToEdit,
});

export default connect(mapStateToProps)(WalletForm);
