import {
  WALLET_ADD, WALLET_EDIT, REQUEST_STARTED, RECEIVE_EXCHANGE,
  RECEIVE_CURRENCIES, FAILED_REQUEST } from '../actions';

const INITIAL_STATE = {
  isFetching: false,
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currencieds, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  error: '',
};

function wallet(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case REQUEST_STARTED:
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
  case RECEIVE_EXCHANGE:
    return {
      ...state,
      isFetching: false,
    };
  case WALLET_ADD:
    return {
      ...state,
      expenses: [...state.expenses, payload],
    };
  case WALLET_EDIT:
    return {
      ...state,
      editor: payload.editor,
      idToEdit: payload.idToEdit,
    };
  default:
    return state;
  }
}
export default wallet;
