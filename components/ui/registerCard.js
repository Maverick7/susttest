import React, { Fragment, useEffect } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useGetFormQuery } from "../../redux/services/events";
import { getSchema } from "../../redux/main/schema/schema.actions";
import styles from "../../styles/registerCard.module.css";
import EmailValidate from "../ui/DynamicForm/EmailValidate";
import Mainform from "../ui/DynamicForm/Mainform";

const renderField = (field) => (
  <div className="form-group">
    <label htmlFor="InputEmail">Please enter your email id!</label>
    <input
      {...field.input}
      placeholder={field.placeholder}
      type={"email"}
      className="form-control"
    />
    <p className="text-danger">
      <b>
        {field.meta.touched && field.meta.error && (
          <span className="error">{field.meta.error}</span>
        )}
      </b>
    </p>
  </div>
);
const renderCheck = (field) => (
  <div className="form-group form-check">
    <input {...field.input} type={"checkbox"} className="form-check-input" />
    <label className="form-check-label">
      {" "}
      I agree to be contacted by TCS based on information above. For details on
      how we handle your personal data, please refer to Terms of Use , Privacy
      Terms and Rules & Regulation. I, declare all information provided in the
      form is true and accurate.
    </label>
  </div>
);

const RegCard = ({
  validateStatus,
  isSuccess,
  isEmailvalid,
  mailData,
  message,
  fetchSchema,
}) => {
  const router = useRouter();
  useEffect(() => {
    console.log("validating..");
    if (isEmailvalid && validateStatus === "success") {
      router.push("/login");
    }
  }, [isEmailvalid]);

  return (
    <Fragment>
      <div className={styles.app_card}>
        <div className={styles.app_card_wrapper}>
          <div className={styles.app_card_head}>
            <h3>Register</h3>
          </div>
          <div className={styles.app_card_body}>
            {!isEmailvalid && validateStatus === "success" && !isSuccess ? (
              <Mainform />
            ) : (
              <EmailValidate />
            )}
            <div className={styles.app_card_bottom}>
              <div className={styles.app_card_bottom}>
                <p>
                  Already have account{" "}
                  <Link href={"/login"}>
                    <a className={styles.link}> Login</a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <h4>{message}</h4>
      </div>
    </Fragment>
  );
};
function mapStateToProps(state) {
  const { validateStatus, isSuccess, isEmailvalid, mailData, message } =
    state.verifyEmail;
  return {
    validateStatus,
    isSuccess,
    isEmailvalid,
    mailData,
    message,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchSchema: (id) => dispatch(getSchema(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RegCard);
