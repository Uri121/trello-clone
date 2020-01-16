import React from "react";
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

const Signup = ({ handleSubmit, valid, errMsg }) => {
  return (
    <div className="container">
      <h1 className="text-center">Sign Up</h1>
      <form className="form-group" onSubmit={handleSubmit}>
        <Field
          name="name"
          type="text"
          component={renderInput}
          validate={[required, name]}
          label="Name"
          className="form-control"
        />
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
    form: "signup",
    onSubmit: register
  })(Signup)
);
