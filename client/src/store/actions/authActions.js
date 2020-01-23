import * as mutations from "../mutations";
import axios from "axios";
import { returnErrors, clearErros } from "./errorActions";
import { history } from "../history";
import { loadList } from "./listAdctions";

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: mutations.USER_LOADING });
  const header = tokenConfig(getState);

  if (header) {
    axios
      .get("/user/auth", header)
      .then(res => {
        dispatch({ type: mutations.USER_LOADED, payload: res.data });
        dispatch(loadList(res.data.email));
        history.push("/dashboard");
      })
      .catch(err => {
        dispatch({ type: mutations.AUTH_ERROR });
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  }
};

export const register = (values, dispatch) => {
  dispatch(clearErros());
  axios
    .post("/user/create", {
      name: values.name,
      email: values.email,
      password: values.password
    })
    .then(res => {
      dispatch({ type: mutations.REGISTER_SUCCESS, payload: res.data });
      localStorage.setItem("token", res.data.token);
      history.push("/dashboard");
    })
    .catch(err => {
      dispatch({ type: mutations.REGISTER_FAIL });
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
    });
};

export const login = (values, dispatch) => {
  dispatch(clearErros());
  axios
    .post("/user/login", {
      email: values.email,
      password: values.password
    })
    .then(res => {
      dispatch({ type: mutations.LOGIN_SUCCESS, payload: res.data });
      console.log(res.data);
      
      dispatch(loadList(res.data.user.email));
      localStorage.setItem("token", res.data.token);
      history.push("/dashboard");
    })
    .catch(err => {
      dispatch({ type: mutations.LOGIN_FAIL });
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      history.push("/");
    });
};

export const tokenConfig = getState => {
  const token = getState().auth.token;
  const config = {
    headers: {}
  };
  if (token) {
    config.headers["x-auth-token"] = token;
    return config;
  }
};
