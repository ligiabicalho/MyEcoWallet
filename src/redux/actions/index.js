export const USER_LOGIN = 'USER_LOGIN';
export const WALLET_ADD = 'WALLET_ADD';
export const WALLET_DELETE = 'WALLET_DELETE';
export const WALLET_UPDATE = 'WALLET_UPDATE';
export const WALLET_EDIT = 'WALLET_EDIT';

export const REQUEST_STARTED = 'REQUEST_STARTED';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';
export const RECEIVE_EXCHANGE = 'RECEIVE_EXCHANGE';
export const FAILED_REQUEST = 'FAILED_REQUEST';

export const actionCreator = (type, payload) => ({
  type,
  payload,
});

const fetchAll = async (dispatch) => {
  try {
    dispatch(actionCreator(REQUEST_STARTED)); // action -> isFetching: true;
    const endpoint = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(endpoint);
    const data = await response.json();
    delete data.USDT;
    return data;
  } catch (error) {
    dispatch(actionCreator(FAILED_REQUEST, error));
  }
};

// Duas maneiras de enviar action assíncrona (que deve retornar uma função):

// 1- A action retorna uma outra função assíncrona;
export const actionFetchCurrencies = () => async (dispatch) => {
  const currencies = Object.keys(await fetchAll(dispatch));
  dispatch(actionCreator(RECEIVE_CURRENCIES, currencies)); // action -> isFetching: false e currencies;
};

const fetchExchangeRates = async (dispatch) => {
  const exchangeRates = await fetchAll(dispatch);
  dispatch(actionCreator(RECEIVE_EXCHANGE)); // action -> isFetching: false;
  return exchangeRates;
};

// 2- A action retorna uma variável que é uma função assíncrona:
export const actionFetchExchangeRates = () => fetchExchangeRates;
