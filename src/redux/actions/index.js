export const USER_LOGIN = 'USER_LOGIN';
export const WALLET_ADD = 'WALLET_ADD';
export const WALLET_DELETE = 'WALLET_DELETE';
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
    dispatch(actionCreator(REQUEST_STARTED, true));
    const endpoint = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    dispatch(actionCreator(FAILED_REQUEST, error));
  }
};

const fetchCurrencies = async (dispatch) => {
  const allCurrencies = Object.keys(await fetchAll(dispatch));
  const currencies = allCurrencies.filter((c) => c !== 'USDT');
  dispatch(actionCreator(RECEIVE_CURRENCIES, currencies));
};

export const actionFetchCurrencies = () => fetchCurrencies;

const fetchExchangeRates = async (dispatch) => {
  const exchangeRates = await fetchAll(dispatch);
  delete exchangeRates.USDT;
  dispatch(actionCreator(REQUEST_STARTED, false));
  return exchangeRates;
};

export const actionFetchExchangeRates = () => fetchExchangeRates;
