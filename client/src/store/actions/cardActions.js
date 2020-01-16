import * as mutations from "../mutations";
import uuid from 'uuid';
import { returnErrors, clearErros } from "./errorActions";
import axios from "axios";
import { tokenConfig } from './listAdctions';

export const addCard = (listId,text,token)=>{
    return dispatch => {
        dispatch(clearErros());
        const id = uuid();
        console.log("in dispatch",token,text, listId);
        const header = tokenConfig(token);
        console.log(header);
        if (header) {
          axios
            .post("/card/create", {
              text: text,
              id: id,
              listID:listId
            },header)
            .then(res => {
              dispatch({ type: mutations.ADD_CARD, payload: res.data });
              console.log(res.data);
              
              dispatch({ type: mutations.ADD_CARD_SUCCESS });             
            })
            .catch(err => {
              dispatch({ type: mutations.ADD_CARD_FAILED });
              dispatch(
                returnErrors(
                  err.response.data,
                  err.response.status,
                  "ADD_CARD_FAILED"
                )
              );
            });
        }
      };
};