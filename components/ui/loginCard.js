import React, { Fragment } from "react";
import { useRouter } from "next/router";
import { Field, reduxForm } from "redux-form";
import Link from "next/link";
import { login } from "../../redux/main/auth/auth.actions";
import validate from "../validation/LoginValidation";
import { useSelector, useDispatch, connect } from "react-redux";
import AlertBox from "../ui/errorAlerts/Alertbox";
import styles from "../../styles/registerCard.module.css";
import { FailAlert, LoadingAlert, SucessAlert } from "./errorAlerts/loginAlert";
// outside your render() method
const renderField = (field) => (
  <div className={`form-group ${styles.input_field}`}>
    {/* <label htmlFor="InputEmail">{field.label}</label> */}
    {console.log(field)}
    <input
      {...field.input}
      placeholder={field.placeholder}
      type={field.type}
      className="form-control"
    />
    <div className={`${styles.error_wrap}`}>
      <p className={`${styles.error_text}`}>
        {field.meta.touched && field.meta.error && (
          <span className="error">{field.meta.error}</span>
        )}
      </p>
    </div>
  </div>
);

let LoginCard = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    isLoading,
    authStatus,
    inMessage,
    isLoggedIn,
    user,
  } = props;
  // login alert states 
  const alertVariant = () => {
    if (authStatus === "authenticated") {
      return "alert_success";
    } else if (authStatus === "failed" || authStatus === "error") {
      return "alert_danger";
    } else if (authStatus === "authenticating" || isLoading) {
      return "alert_loader";
    }
  };
  const onSubmitHandler = (values) => {
    // console.log(values);
    dispatch(login(values));
    reset();
  };
  return (
    <Fragment>
      <div className={styles.app_card}>
        <div className={styles.app_card_wrapper}>
          <div className={styles.app_card_head}>
            <h3>Login</h3>
          </div>
          {authStatus === "authenticating" && isLoading ? (
            <AlertBox
              message={"Please wait Logging in..."}
              variant={alertVariant()}
            />
          ) : (
            ""
          )}
          {authStatus !== "idle" &&
          authStatus !== "authenticating" &&
          inMessage ? (
            <AlertBox message={inMessage} variant={alertVariant()} />
          ) : (
            ""
          )}
          <div className={styles.app_card_body}>
            <form autoComplete="off" onSubmit={handleSubmit(onSubmitHandler)}>
              <Field
                name="email"
                component={renderField}
                type="email"
                placeholder="Email"
                label="Email"
              />
              <Field
                name="password"
                component={renderField}
                type="password"
                placeholder="Password"
                label="Password"
              />
              <div className={`${styles.fp_link}`}>
                <Link href={"/forgotPassword"}>
                  <a>Forgot Password?</a>
                </Link>
              </div>
              <div className={`primary_btn_module_wrapper `}>
                <button
                  type="submit"
                  disabled={
                    (isLoading && authStatus === "authenticating") ||
                    pristine ||
                    isLoggedIn ||
                    submitting
                  }
                  className={`primary_btn primary_btn_padding`}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
function mapStateToProps(state) {
  const { isLoading, authStatus, inMessage, isLoggedIn, user } = state.auth;
  return {
    isLoading,
    authStatus,
    inMessage,
    isLoggedIn,
    user,
  };
}
// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchSchema: (id) => dispatch(getSchema(id)),
//   };
// };

LoginCard = reduxForm({
  form: "LoginForm", // a unique identifier for this form
  validate,
})(LoginCard);

export default connect(mapStateToProps, null)(LoginCard);
