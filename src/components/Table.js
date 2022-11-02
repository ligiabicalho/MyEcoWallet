import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/Table.css';
import { actionCreator, WALLET_DELETE } from '../redux/actions';

class Table extends Component {
  handleDeleteExpenses = (id) => {
    const { dispatch, expenses } = this.props;
    const deleteExpense = expenses.filter((expense) => expense.id !== id);
    dispatch(actionCreator(WALLET_DELETE, deleteExpense));
  };

  render() {
    const { expenses } = this.props;
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
            {expenses.length > 0
            && expenses.map((expense, i) => (
              <tr key={ i }>
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
                    data-testid="delete-btn"
                    onClick={ () => this.handleDeleteExpenses(expense.id) }
                  >
                    Delete
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf,
}.isRequired;

export default connect(mapStateToProps)(Table);
