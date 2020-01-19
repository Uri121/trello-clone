import React from "react";
import { Icon } from "@material-ui/core";
import { connect } from "react-redux";
import { deleteList } from "../store/actions/listAdctions";
import { deleteCard } from "../store/actions/cardActions";

const DeleteButton = ({ id, token, listDelete, isList,listID,cardDelete }) => {

  const hundleDelete = () => {
    if (isList) {
      listDelete(id, token);
    }
    cardDelete(id, token, listID);
  };

  return (
    <div className="button-delete">
      <button onClick={() => hundleDelete(id, token)}>
        <Icon>delete</Icon>
      </button>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  id: ownProps.id,
  token: state.auth.token,
  isList: ownProps.isList,
  listID:ownProps.listId
});
const mapDispatchToProps = {
  listDelete: deleteList,
  cardDelete: deleteCard
};
export default connect(mapStateToProps, mapDispatchToProps)(DeleteButton);
