import React, { Fragment } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import AlertBox from "../ui/errorAlerts/Alertbox";
import changePasswordValidation from "../validation/ChangePwdValidation";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { changePassword } from "../../redux/main/changePassword/changePassword.actions";
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
    <p className="text-danger">
      {field.meta.touched && field.meta.error && (
        <span className="error">{field.meta.error}</span>
      )}
    </p>
  </div>
);

let resetCard = (props) => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    isLoading,
    changePasswdStatus,
    isSuccess,
    isError,
    message,
  } = props;
  // reset alert states
  const alertVariant = () => {
    if (changePasswdStatus === "success") {
      return "alert_success";
    } else if (
      changePasswdStatus === "failed" ||
      changePasswdStatus === "error"
    ) {
      return "alert_danger";
    } else if (changePasswdStatus === "loading" || isLoading) {
      return "alert_loader";
    }
  };
  const onSubmitHandler = (values) => {
    const { confirmPassword, ...resetObj } = values;
    console.log("main submitting data", resetObj);
    dispatch(changePassword(resetObj));
  };
  return (
    <Fragment>
      <div className={styles.app_card}>
        <div className={styles.app_card_wrapper}>
          <div className={styles.app_card_head}>
            <h3>Password Reset</h3>
          </div>
          {changePasswdStatus === "loading" ? (
            <AlertBox
              message={"Please wait changing your password..."}
              variant={alertVariant()}
            />
          ):''}
          {changePasswdStatus !== "idle" &&
          changePasswdStatus !== "loading" &&
          message ? (
            <AlertBox message={message} variant={alertVariant()} />
          ) : (
            ""
          )}
          <div className={styles.app_card_body}>
            <form autoComplete="off" onSubmit={handleSubmit(onSubmitHandler)}>
              <Field
                name="oldPassword"
                component={renderField}
                type="password"
                placeholder="Enter Current Password"
                label="Enter Current Password"
              />
              <Field
                name="newPassword"
                component={renderField}
                type="password"
                placeholder="Enter New Password"
                label="Enter New Password"
              />
              <Field
                name="confirmPassword"
                component={renderField}
                type="password"
                placeholder="Confirm Password"
                label="Confirm Password"
              />
              <div className={`primary_btn_module_wrapper `}>
                <button
                  type="submit"
                  className={`primary_btn primary_btn_padding`}
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
  const { isLoading, changePasswdStatus, isSuccess, isError, message } =
    state.changePassword;
  return {
    isLoading,
    changePasswdStatus,
    isSuccess,
    isError,
    message,
  };
}
resetCard = connect(mapStateToProps, null)(resetCard);

export default reduxForm({
  form: "resetForm", // a unique identifier for this form
  validate: changePasswordValidation,
})(resetCard);
