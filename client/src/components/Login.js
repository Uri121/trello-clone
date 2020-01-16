import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { renderInput, required, email, password } from "../form-utils/utils";
import { login } from "./../store/actions/authActions";
import { NavLink } from "react-router-dom";

const Login = ({ handleSubmit, valid, errMsg }) => {
  return (
    <div className="container">
      <div className="register">
        <NavLink to="/signup">Sign Up</NavLink>
      </div>
      <h1 className="text-center">Login</h1>
      <form id="login-form" className="form-group" onSubmit={handleSubmit}>
        <Field
          name="email"
          type="email"
          component={renderInput}
          validate={[required, email]}
          className="form-control"
          label="Email"
        />
        <Field
          name="password"
          type="password"
          component={renderInput}
          validate={[required, password]}
          className="form-control"
          label="Password"
        />
        {errMsg !== "No token, authorization denied" ? <p>{errMsg}</p> : null}
        <button
          className="btn btn-primary mt-3"
          disabled={!valid}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ error }) => ({
  errMsg: error.msg.msg
});

export default connect(mapStateToProps)(
  reduxForm({
    form: "login",
    onSubmit: login
  })(Login)
);
