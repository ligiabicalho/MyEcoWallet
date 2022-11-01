import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletForm extends Component {
  render() {
    const { currencies } = this.props;
    return (
      <div className="wallet-form">
        <form>
          <label htmlFor="value-input">
            Valor da despesa:
            <input
              type="number"
              id="value-input"
              name="value"
              // value=""
              data-testid="value-input"
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              id="description"
              name="description"
              // value=""
              data-testid="description-input"
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              id="currency"
              name="currency"
              data-testid="currency-input"
            >
              {currencies.map((currency, i) => (
                <option key={ i } value={ currency }>
                  {currency}
                </option>
              ))}

            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento:
            <select
              id="method"
              name="method"
              data-testid="method-input"
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
              data-testid="tag-input"
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
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf,
  dispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
