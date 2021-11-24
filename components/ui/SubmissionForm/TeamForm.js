import React, { Fragment } from "react";
import { connect } from "react-redux";
import styles from "../../../styles/Forms/Team.module.css";
import { Field, FieldArray, reduxForm } from "redux-form";
import Uploader from "../fileUploader/TeamUpload/Uploader";
const renderField = ({
  input,
  placeholder,
  type,
  meta: { touched, error },
}) => (
  <div
    className={`form-group   ${styles.team_form_col1} ${styles.team_form_grp}`}
  >
    <input
      {...input}
      type={type}
      placeholder={placeholder}
      className={`form-control ${styles.team_input}`}
      id="teamInput"
    />
    {touched && error && <span>{error}</span>}
  </div>
);
const renderTextarea = (field) => (
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

const renderUsers = ({ fields, meta: { error, submitFailed } }) => (
  <div className={`${styles.member_list_wrap}`}>
    <div className={`${styles.mber_btn_wrap}`}>
      <div className={`${styles.mber_title}`}>
        <h4>Team</h4>
      </div>
      <div className={`${styles.mber_action}`}>
        <button
          className={`${styles.addmber_btn}`}
          type="button"
          onClick={() => fields.push({})}
        >
          <img src={`/images/ic_add.svg`} width={20} className="img-fluid" />
        </button>
      </div>
    </div>

    {fields &&
      fields.map((user, index) => {
        return (
          <div
            key={index}
            className={`${styles.team_form_row} ${styles.mber_btn_wra}`}
          >
            <Field
              name={`${user}.email`}
              type="text"
              component={renderField}
              placeholder={`Team member ${index + 1}`}
            />
            <div className={`  ${styles.team_form_col2}`}>
              <button
                className={`${styles.removember_btn}`}
                type="button"
                title="Remove Member"
                disabled={fields && fields.length === 1}
                onClick={() => fields.remove(index)}
              >
                <img
                  src={`/images/ic_del.svg`}
                  width={20}
                  className="img-fluid"
                />
              </button>
            </div>
          </div>
        );
      })}
  </div>
);

let TeamForm = (props) => {
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    teamIdea,
    submitChallengeIdea,
    user,
    eventId,
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
    console.log(values)
    const indValues = {
      status: action,
      role: action,
      fileUrl: uploaderUrl,
      eventId,
      user:values.user&&values.user.concat(user),
      challengeId,
    };
    console.log(indValues);
    // submitChallengeIdea(indValues);
  };
  return (
    <Fragment>
      <div className={`submission_form_wrapper`}>
      {currentAlertStatus(teamIdea.status, teamIdea.message)}
        <form onSubmit={handleSubmit}>
          <FieldArray
            name="user"
            type="text"
            component={renderUsers}
            label="Team member"
          />
          <Field
            name="Comments"
            component={renderTextarea}
            type="text"
            placeholder="Comments (optional)"
          />
          <Uploader />
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
  const { teamIdea } = state.submitIdea;
  // let authUser = { email: "", eventId: "" };
  // if (user !== null) {
  //   authUser = {
  //     user: [user.email],
  //     eventId: user.eventId,
  //   };
  // }
  return {
    user: [{email:user.email}],
    eventId: user.eventId,
    uploaderUrl: individualFile.fileUrl,
    challengeId: currentChallengeId,
    teamIdea: teamIdea,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    submitChallengeIdea: (values) => dispatch(teamIdeaSubmit(values)),
  };
};

TeamForm = connect(mapStateToProps, mapDispatchToProps)(TeamForm);

export default reduxForm({
  form: "TeamForm", // a unique identifier for this form
  initialValues: {
    users: [{}, {}, {}],
  },
})(TeamForm);
