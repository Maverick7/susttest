import React, { Fragment } from "react";
import { Field, reduxForm } from "redux-form";
import AlertBox from "../ui/errorAlerts/Alertbox";
import Link from "next/link";
import forgotPwdValidation from "../validation/forgotPwdValidation";
import { forgotPassword } from "../../redux/main/forgotPassword/forgotPassword.actions";
import { useSelector, useDispatch, connect } from "react-redux";
import styles from "../../styles/registerCard.module.css";
// outside your render() method
const renderField = (field) => (
  <div className={`form-group ${styles.input_field}`}>
    {/* <label htmlFor="InputEmail">{field.label}</label> */}
    <input
      {...field.input}
      placeholder={field.placeholder}
      type={field.type}
      className="form-control"
    />
    <p className="text-danger mt-2">
        {field.meta.touched && field.meta.error && (
          <span className="error">{field.meta.error}</span>
        )}
    </p>
  </div>
);

let ForgotCard = (props) => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    isLoading,
    forgotPasswdStatus,
    isSuccess,
    isError,
    message,
    postForgotpassword,
  } = props;
  // forgot pwd alert states
  const alertVariant = () => {
    if (forgotPasswdStatus === "success") {
      return "alert_success";
    } else if (
      forgotPasswdStatus === "failed" ||
      forgotPasswdStatus === "error"
    ) {
      return "alert_danger";
    } else if (forgotPasswdStatus === "loading" || isLoading) {
      return "alert_loader";
    }
  };
  const onSubmitHandler = (values) => {
    postForgotpassword(values);
    reset();
  };
  return (
    <Fragment>
      <div className={styles.app_card}>
        <div className={styles.app_card_wrapper}>
          <div className={styles.app_card_head}>
            <h3>Forgot Password</h3>
            <p>Enter your registered email ID to receive a verification link</p>
          </div>
          {forgotPasswdStatus === "loading" ? (
            <AlertBox
              message={"Please wait changing your password..."}
              variant={alertVariant()}
            />
          ) : (
            ""
          )}
          {forgotPasswdStatus !== "idle" &&
          forgotPasswdStatus !== "loading" &&
          message ? (
            <AlertBox message={message} variant={alertVariant()} />
          ) : (
            ""
          )}
          <div className={styles.app_card_body}>
            <form autoComplete="off" onSubmit={handleSubmit(onSubmitHandler)}>
              <Field
                name="email"
                component={renderField}
                type="email"
                placeholder="Enter registered mail Id"
                label="Email"
              />
              <div className={`primary_btn_module_wrapper `}>
                <button
                  type="submit"
                  className={`primary_btn primary_btn_padding`}
                  disabled={
                    (isLoading && forgotPasswdStatus === "loading") ||
                    pristine ||
                    submitting
                  }
                >
                  Submit
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
  const { isLoading, forgotPasswdStatus, isSuccess, isError, message } =
    state.forgotPassword;
  return {
    isLoading,
    forgotPasswdStatus,
    isSuccess,
    isError,
    message,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    postForgotpassword: (values) => dispatch(forgotPassword(values)),
  };
};
ForgotCard = connect(mapStateToProps, mapDispatchToProps)(ForgotCard);

export default reduxForm({
  form: "ForgotForm", // a unique identifier for this form
  validate: forgotPwdValidation,
})(ForgotCard);
