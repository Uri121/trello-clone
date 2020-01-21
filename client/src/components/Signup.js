import React, { useEffect } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import {
  renderInput,
  required,
  email,
  name,
  password
} from "../form-utils/utils";
import { register } from "../store/actions/authActions";
import logo from "../assets/logo.png";
import { clearErros } from "../store/actions/errorActions";

const Signup = ({ handleSubmit, valid, errMsg, clear }) => {
  useEffect(() => {
    if (errMsg) {
      clear();
    }
  }, [clear, errMsg]);
  return (
    <div className="login-container">
      <div className="title-container">
        <h1>Register to start manging your tasks</h1>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <Field
          name="name"
          type="text"
          component={renderInput}
          validate={[required, name]}
          label="Name"
          className="form-input"
        />
        <Field
          name="email"
          type="email"
          component={renderInput}
          validate={[required, email]}
          className="form-input"
          label="Email"
        />
        <Field
          name="password"
          type="password"
          component={renderInput}
          validate={[required, password]}
          className="form-input"
          label="Password"
        />
        {errMsg !== "No token, authorization denied" ? <p>{errMsg}</p> : null}

        <div className="login">
          <button className="form-button" disabled={!valid} type="submit">
            Register
          </button>
        </div>
      </form>
      <div className="logo">
        <img src={logo} alt="" />
      </div>
    </div>
  );
};

const mapStateToProps = ({ error }) => ({
  errMsg: error.msg.msg
});

const mapDispatchToProps = {
  clear: clearErros
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: "signup",
    onSubmit: register
  })(Signup)
);
