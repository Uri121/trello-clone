import * as mutations from "../mutations";

const initialState = {
  msg: {},
  status: null,
  id: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case mutations.GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id
      };
    case mutations.CLEAR_ERRORS:
      return {
        msg: {},
        status: null,
        id: null
      };
    default:
      return state;
  }
}
