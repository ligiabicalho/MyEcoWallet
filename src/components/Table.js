import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/Table.css';
import { actionCreator, WALLET_DELETE, WALLET_EDIT } from '../redux/actions';

class Table extends Component {
  deleteExpense = (id) => {
    const { dispatch, expenses } = this.props;
    const deleteExpense = expenses.filter((expense) => expense.id !== id);
    dispatch(actionCreator(WALLET_DELETE, deleteExpense));
    // neste caso, o filter retira um elemento do array, caso estivéssemos apenas editando uma chave, o JS não interpretaria como um novo array para ser renderizado.
  };

  startEditExpense = (id) => {
    const { dispatch } = this.props;
    dispatch(actionCreator(WALLET_EDIT, id));
  };

  render() {
    const { expenses, isFetching } = this.props;
    return (
      <div className="table-page">
        <h2>Table</h2>
        <table className="grid-table">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {isFetching ? <tr><td>Loading</td></tr>
              : (expenses.length > 0
            && expenses.map((expense) => (
              <tr key={ expense.id }>
                {/* Não colocar key=index, pois como o array tanto pode aumentar como diminuir, irá alterar a key */}
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{parseFloat(expense.value).toFixed(2)}</td>
                <td>{expense.exchangeRates[expense.currency].name}</td>
                <td>
                  {parseFloat(expense.exchangeRates[expense.currency].ask)
                    .toFixed(2)}
                </td>
                <td>
                  {parseFloat(expense.value * expense.exchangeRates[expense.currency]
                    .ask).toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => this.startEditExpense(expense.id) }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.deleteExpense(expense.id) }
                  >
                    Delete
                  </button>

                </td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
  isFetching: wallet.isFetching,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf,
  dispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(Table);
