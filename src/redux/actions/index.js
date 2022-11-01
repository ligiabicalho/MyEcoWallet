export const USER_LOGIN = 'USER_LOGIN';
export const WALLET_EDIT = 'WALLET_EDIT';

export const REQUEST_CURRENCIES_STARTED = 'REQUEST_CURRENCIES_STARTED';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';
export const FAILED_REQUEST = 'FAILED_REQUEST';

export const actionCreator = (type, payload) => ({
  type,
  payload,
});

const fetchCurrencies = async (dispatch) => {
  try {
    dispatch(actionCreator(REQUEST_CURRENCIES_STARTED, true));
    const endpoint = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(endpoint);
    const data = await response.json();
    const allCurrencies = Object.keys(data);
    const currencies = allCurrencies.filter((c) => c !== 'USDT');
    dispatch(actionCreator(RECEIVE_CURRENCIES, currencies));
  } catch (error) {
    dispatch(actionCreator(FAILED_REQUEST, error));
  }
};

export const actionFetchCurrencies = () => fetchCurrencies;
