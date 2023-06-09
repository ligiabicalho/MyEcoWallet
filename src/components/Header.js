import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/Header.css';

class Header extends Component {
  sumExpenses = () => {
    const { expenses } = this.props;
    if (expenses.length > 0) {
      const expensesTotal = expenses.reduce((acc, expense) => {
        acc += expense.value * expense.exchangeRates[expense.currency].ask;
        return acc;
      }, 0);
      return parseFloat(expensesTotal).toFixed(2);
    }
    if (expenses.length === 0) { return '0.00'; }
  };

  render() {
    const { email, isFetching } = this.props;
    return (
      <div className="header">
        <div className="header-email" data-testid="email-field">{email}</div>
        <div className="header-total">
          Despesa total:
          {
            isFetching ? <p>Loading</p>
              : (
                <span data-testid="total-field">
                  {this.sumExpenses()}
                </span>)
          }
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
  isFetching: wallet.isFetching,
});

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string }),
  expenses: PropTypes.arrayOf,
}.isRequired;

export default connect(mapStateToProps)(Header);
