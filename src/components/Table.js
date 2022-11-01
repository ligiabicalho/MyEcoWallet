import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/Table.css';

class Table extends Component {
  render() {
    return (
      <div className="table-page">
        Table
        <table className="grid-table">
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
          <tr>
            <td>cell1_1</td>
            <td>cell2_1</td>
            <td>cell3_1</td>
            <td>cell4_1</td>
            <td>cell5_1</td>
            <td>cell6_1</td>
            <td>cell7_1</td>
            <td>cell8_1</td>
            <td>cell9_1</td>
          </tr>
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({ wallet: expenses }) => ({
  expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf,
}.isRequired;

export default connect(mapStateToProps)(Table);
