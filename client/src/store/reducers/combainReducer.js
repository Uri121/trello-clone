
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { reducer as formReducer } from "redux-form";
import thunk from 'redux-thunk';
import listReducer from './listReducer';
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";


export const store = createStore(
    combineReducers({
      form:formReducer,
      lists: listReducer,
      auth: authReducer,
      error: errorReducer
    }),
    compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
