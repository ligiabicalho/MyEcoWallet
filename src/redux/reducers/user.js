import { USER_LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
};

function user(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case USER_LOGIN:
    return {
      ...state,
      email: payload,
    };
  default:
    return state;
  }
}
export default user;
