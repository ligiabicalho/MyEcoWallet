import React, { Component } from 'react';

class WalletForm extends Component {
  render() {
    return (
      <div className="wallet-form">
        <form>
          <label htmlFor="value-input">
            Valor da despesa:
            <input
              type="number"
              id="value-input"
              name="value"
              value=""
              data-testid="value-input"
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              id="description"
              name="description"
              value=""
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
              <option value="Valor 1">
                {/* API */}
              </option>
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento:
            <select
              id="method"
              name="method"
              value=""
              options=""
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

export default WalletForm;
