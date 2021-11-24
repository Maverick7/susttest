import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import styles from "../../../styles/Forms/Individual.module.css";
import Uploader from "../fileUploader/IndividualUpload/Uploader";
import { individualIdeaSubmit } from "../../../redux/main/submitIdea/submitIdea.actions";
import AlertBox from "../errorAlerts/Alertbox";
const renderField = (field) => (
  <div class="form-group">
    <textarea
      class="form-control"
      rows="3"
      id="comment"
      {...field.input}
      placeholder={field.placeholder}
      type={field.type}
    ></textarea>
    <p className="text-danger">
      <b>
        {field.meta.touched && field.meta.error && (
          <span className="error">{field.meta.error}</span>
        )}
      </b>
    </p>
  </div>
);
let IndividualForm = (props) => {
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    individualIdea,
    submitChallengeIdea,
    user,
    uploaderUrl,
    challengeId,
  } = props;
  function currentAlertStatus(currStatus, message) {
    switch (currStatus) {
      case "idle":
        return "";
      case "loading":
        return (
          <AlertBox
            message={"Please wait submitting your idea..."}
            variant={"alert_loader"}
          />
        );
      case "success":
        return <AlertBox message={message} variant={"alert_success"} />;
      case "failed":
        return <AlertBox message={message} variant={"alert_danger"} />;
      case "error":
        return <AlertBox message={message} variant={"alert_danger"} />;
      default:
        return "";
    }
  }
  const SubmitIdea = (values, action) => {
    const indValues = {
      ...values,
      status: action,
      role: "individual",
      fileUrl: uploaderUrl,
      ...user,
      challengeId,
    };
    console.log(indValues);
    submitChallengeIdea(indValues);
  };
  return (
    <Fragment>
      <div className={`submission_form_wrapper`}>
        {currentAlertStatus(individualIdea.status, individualIdea.message)}
        <form>
          <Field
            name="comments"
            component={renderField}
            type="text"
            placeholder="Comments (optional)"
            label="Comments (optional)"
          />
          <div className={`uploader_main_wrapper`}>
            <Uploader />
          </div>
          <div className={`${styles.upload_btn_wrapper}`}>
            <button
              type="button"
              onClick={handleSubmit((values) => SubmitIdea(values, "draft"))}
              className={`draft_outline_btn  ${styles.btn_row}`}
            >
              <div
                disabled={submitting}
                className={`draft_btn_padding draft_btn_txt`}
              >
                Save Draft
              </div>
            </button>
            <button
              type="button"
              onClick={handleSubmit((values) =>
                SubmitIdea(values, "submitted")
              )}
              className={`submit_btn ${styles.btn_row}`}
            >
              <div disabled={submitting} className={`submit_btn_padding`}>
                Submit
              </div>
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};
function mapStateToProps(state) {
  const { user } = state.auth;
  const { individualFile } = state.fileUpload;
  const { currentChallengeId } = state.challenge;
  const { individualIdea } = state.submitIdea;
  let authUser = { email: "", eventId: "" };
  if (user !== null) {
    authUser = {
      user: [{ email: user.email }],
      eventId: user.eventId,
    };
  }
  return {
    user: authUser,
    uploaderUrl: individualFile.fileUrl,
    challengeId: currentChallengeId,
    individualIdea: individualIdea,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    submitChallengeIdea: (values) => dispatch(individualIdeaSubmit(values)),
  };
};

IndividualForm = connect(mapStateToProps, mapDispatchToProps)(IndividualForm);

export default reduxForm({
  form: "IndividualForm", // a unique identifier for this form
})(IndividualForm);
