import {
  WALLET_ADD, WALLET_EDIT, WALLET_DELETE, WALLET_UPDATE, REQUEST_STARTED,
  RECEIVE_EXCHANGE, RECEIVE_CURRENCIES, FAILED_REQUEST } from '../actions';

const INITIAL_STATE = {
  isFetching: false,
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  error: '',
};

// fazer o tratamento dos dados aqui(reducer) é 'melhor' q no WalletForm, já q estou me baseando no estado global.
// map, diferente do find, cria um array novo. No caso, vamos alterar apenas um elemento, e manter os demais na mesma ordem.
const editExpense = (expenses, payload) => expenses.map((expense) => {
  if (expense.id === payload.id) {
    return {
      ...expense, // todas as chaves do estado global
      ...payload, // as chaves do estado local atualizadas, q irá subscrever as anteriores.
    };
  }
  return expense;
});

function wallet(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case REQUEST_STARTED:
    return {
      ...state,
      isFetching: true,
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
  case WALLET_DELETE:
    return {
      ...state,
      expenses: payload,
    };
  case WALLET_UPDATE:
    return {
      ...state,
      expenses: editExpense(state.expenses, payload),
      editor: false,
    };
  case WALLET_EDIT:
    return {
      ...state,
      editor: true,
      idToEdit: payload,
    };
  default:
    return state;
  }
}
export default wallet;
