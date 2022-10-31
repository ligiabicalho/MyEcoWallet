export const USER_LOGIN = 'USER_LOGIN';
export const WALLET_EDIT = 'WALLET_EDI';

export const actionCreator = (type, object) => ({
  type,
  payload: object,
});
