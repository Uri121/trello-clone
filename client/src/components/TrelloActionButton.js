import React, { Component } from "react";
import { Icon, Card, Button } from "@material-ui/core";
import Textarea from "react-textarea-autosize";
import { connect } from "react-redux";
import { addList } from "./../store/actions/listAdctions";
import { addCard } from "./../store/actions/cardActions";

class TrelloActionButton extends Component {
  state = {
    formOpen: false,
    text: ""
  };

  renderForm = () => {
    const { list } = this.props;
    const placeHolder = list ? "Enter list title..." : "Enter card title...";
    const buttonTitle = list ? "Add list" : "Add card";

    return (
      <div className="card-form">
        <Card className="form-card">
          <Textarea
            placeholder={placeHolder}
            autoFocus
            onBlur={this.closeForm}
            value={this.state.text}
            onChange={this.handleIputChange}
          />
        </Card>
        <div className="form-button">
          <Button
            onMouseDown={list ? this.handleAddList : this.handleAddCard}
            variant="contained"
          >
            {buttonTitle}
          </Button>
          <Icon
            onClick={this.closeForm}
            style={{ marginLeft: 8, cursor: "pointer" }}
          >
            close
          </Icon>
        </div>
      </div>
    );
  };

  openForm = () => {
    this.setState({
      formOpen: true
    });
  };

  closeForm = () => {
    this.setState({
      formOpen: false
    });
  };

  handleIputChange = e => {
    this.setState({
      text: e.target.value
    });
  };

  handleAddList = () => {
    const { text } = this.state;
    const {token,user} = this.props;

    if (text) {
      this.setState({
        text: ""
      });
      console.log(text,token,user);
      this.props.ListAdding(text,token,user);
    }
    return;
  };

  handleAddCard = () => {
    const {listId } = this.props.ownProps;
    const { text } = this.state;
    const {token} = this.props;

    if (text) {
      this.setState({
        text: ""
      });
      this.props.CardAdd(listId, text,token);
    }
    return;
  };
  renderAddButton = () => {
    const { list } = this.props;
    const buttonText = list ? "Add another list" : "Add another card";
    const buttonTextOpacity = list ? 1 : 0.5;
    const buttonTextColor = list ? "white" : "inherit";
    const buttonTextBackgroud = list ? "rgba(157, 171, 134, .7)" : "inherit";

    return (
      <div
        onClick={this.openForm}
        className="actionButton"
        style={{
          opacity: buttonTextOpacity,
          color: buttonTextColor,
          backgroundColor: buttonTextBackgroud
        }}
      >
        <Icon>add</Icon>
        <p>{buttonText}</p>
      </div>
    );
  };

  render() {
    return this.state.formOpen ? this.renderForm() : this.renderAddButton();
  }
}

const mapStateToProps=({auth},ownProps)=>({
  token:auth.token,
  user:auth.user.email,
  ownProps,
});

const mapDispatchToProsp = {
  ListAdding: addList,
  CardAdd: addCard
};

export default connect(mapStateToProps,mapDispatchToProsp)(TrelloActionButton);
