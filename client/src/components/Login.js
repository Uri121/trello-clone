import React,{useEffect} from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { renderInput, required, email, password } from "../form-utils/utils";
import { login } from "./../store/actions/authActions";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { clearErros } from "../store/actions/errorActions";

const Login = ({ handleSubmit, valid, errMsg,clear }) => {

  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <div className="login-container">
      <div className="title-container">
        <h1>Login to start manging your tasks</h1>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
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
            Login
          </button>
          <NavLink to="/signup">Dont have account ?</NavLink>
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

export default connect(mapStateToProps,mapDispatchToProps)(
  reduxForm({
    form: "login",
    onSubmit: login
  })(Login)
);
