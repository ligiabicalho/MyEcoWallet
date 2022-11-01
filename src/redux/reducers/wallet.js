import { WALLET_EDIT, REQUEST_CURRENCIES_STARTED,
  RECEIVE_CURRENCIES, FAILED_REQUEST } from '../actions';

const INITIAL_STATE = {
  isFetching: false,
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currencIES, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  error: '',
};

function wallet(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case REQUEST_CURRENCIES_STARTED:
    return {
      ...state,
      isFetching: payload,
    };
  case RECEIVE_CURRENCIES:
    return {
      ...state,
      currencies: payload,
      isFetching: false,
    };
  case FAILED_REQUEST:
    return {
      ...state,
      error: payload,
      isFetching: false,
    };
  case WALLET_EDIT:
    return {
      ...state,
      expenses: payload.expenses,
      editor: payload.editor,
      idToEdit: payload.idToEdit,
    };
  default:
    return state;
  }
}
export default wallet;
