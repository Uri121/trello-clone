import * as mutations from "../mutations";
import uuid from "uuid";
import { returnErrors, clearErros } from "./errorActions";
import axios from "axios";

export const addList = (title, token, user) => {
  return dispatch => {
    dispatch(clearErros());
    const id = uuid();
    console.log("in dispatch", token, user);
    const header = tokenConfig(token);
    console.log(header);
    if (header) {
      axios
        .post(
          "/list/create",
          {
            title: title,
            id: id,
            user: user
          },
          header
        )
        .then(res => {
          dispatch({ type: mutations.ADD_LIST, payload: res.data });
          dispatch({ type: mutations.ADD_LIST_SUCCESS });
        })
        .catch(err => {
          dispatch({ type: mutations.ADD_LIST_FAILED });
          dispatch(
            returnErrors(
              err.response.data,
              err.response.status,
              "ADD_LIST_FAILED"
            )
          );
        });
    }
  };
};

export const sort = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId,
  islist,
  user
) => {
  return dispatch => {
    const data = {
      droppableIdStart,
      droppableIdEnd,
      droppableIndexStart,
      droppableIndexEnd,
      draggableId,
      islist
    };
    dispatch({ type: mutations.DRAG_HAPPENED, payload: data });
    axios.post("/list/update", {
      data
    });
  };
};

export const loadList = user => {
  return dispatch => {
    dispatch(clearErros());
    dispatch({ type: mutations.LIST_LOADING });
    console.log(user);

    axios
      .get("/list/get", {
        params: {
          user
        }
      })
      .then(res => {
        dispatch({ type: mutations.LIST_LOADED, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: mutations.LIST_LOADED_FAILED });
        dispatch(
          returnErrors(
            err.response.data,
            err.response.status,
            "LIST_LOADED_FAILED"
          )
        );
      });
  };
};

export const deleteList = (id, token) => {
  return dispatch => {
    dispatch(clearErros());
    console.log(id);
    const header = tokenConfig(token);
    if (header) {
      axios
        .delete(`/list/delete/${id}`)
        .then(res => {
          dispatch({ type: mutations.LIST_DELETED, payload: id });
        })
        .catch(err => {
          dispatch({ type: mutations.LIST_DELETED_FAILED });
          dispatch(
            returnErrors(
              err.response.data,
              err.response.status,
              "LIST_DELETED_FAILED"
            )
          );
        });
    }
  };
};

export const tokenConfig = token => {
  const config = {
    headers: {}
  };
  if (token) {
    config.headers["x-auth-token"] = token;
    return config;
  }
};
