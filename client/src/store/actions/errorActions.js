import * as mutations from "../mutations";

export const returnErrors = (msg, status, id = null) => {
  return {
    type: mutations.GET_ERRORS,
    payload: { msg, status, id }
  };
};

export const clearErros = () => {
  return {
    type: mutations.CLEAR_ERRORS
  };
};
