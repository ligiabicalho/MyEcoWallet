import { WALLET_EDIT } from '../actions';
import store from '../store';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

function wallet(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case WALLET_EDIT:
    return {
      ...store,
      currencies: payload.currencies,
      expenses: payload.expenses,
      editor: payload.editor,
      idToEdit: payload.idToEdit,
    };
  default:
    return state;
  }
}
export default wallet;
