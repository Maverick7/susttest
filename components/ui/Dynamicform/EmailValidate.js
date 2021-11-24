import { useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { verifyEmail } from "../../../redux/main/verifyMail/verify.actions";
import AlertBox from "../errorAlerts/Alertbox";
import Form from "@rjsf/bootstrap-4";
import { Fragment, useState, useEffect } from "react";
import {
  InputField,
  CheckBoxField,
  CheckBoxsField,
  ToggleField,
  SelectField,
  PasswordField,
  RSingleselect,
  RMultipleselect,
} from "../../widgets/widgets";
// before Verify schema
const VerifyFormsource = `{
  "type":"object",
  "properties":{
      "Signup":{
          "type":"object",
          "title":"Please fill in this form to create an account!",
          "properties":{
              "email":{
                  "type":"string",
                  "title":"Email"
              },
              "AcceptTerms":{
                  "title":"Accept terms and conditions",
                  "type":"boolean"
              }
          }
      }
  }
}
`;
const VerifyUIsource = `{
  "Signup":{
      "email":{
          "ui:placeholder":"Enter email id",
          "ui:widget":"CustomInputField",
          "ui:autofocus":true
      },
      "AcceptTerms":{
          "ui:widget":"CustomCheckField",
          "content":"<p>I agree to be contacted by TCS based on information above. For details on how we handle your personal data, please refer to <a href='#'>Terms of Use</a> , <a href='#'>Privacy Terms</a> and <a href='#'>Rules & Regulation</a>. I, declare all information provided in the form is true and accurate.</p>"
      }
  }
}`;
const EmailValidate = ({
  validateStatus,
  isSuccess,
  isEmailvalid,
  mailData,
  message,
  isLoading
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  // console.log("dynamic form", eventId);
  const [SubmitformData, setSubmitformData] = useState({});
  const onChange = ({ formData }, e) => {
    const { Signup } = formData;
    setSubmitformData(Signup);
    console.log("Data onchange: ", Signup);
  };

  const onSubmit = async ({ formData }, e) => {
    const { Signup } = formData;
    console.log("Data submitted: ", Signup);
    let MainData = Signup;
    MainData["eventId"] = "SG2021D";
    dispatch(verifyEmail(MainData));
    console.log("after verify email", isSuccess, validateStatus, isEmailvalid);
    console.log(MainData);
  };
  const widgets = {
    CustomInputField: InputField,
    CustomPasswordField: PasswordField,
    CustomCheckField: CheckBoxField,
    CustomChecksField: CheckBoxsField,
    CustomToggle: ToggleField,
    CustomSelect: SelectField,
    CustomRSingleSelectField: RSingleselect,
    CustomRMultiSelectField: RMultipleselect,
  };
  const alertVariant = () => {
    if (validateStatus === "success") {
      return "alert_success";
    } else if (validateStatus === "failed" || validateStatus === "error") {
      return "alert_danger";
    } else if (validateStatus === "loading" || isLoading) {
      return "alert_loader";
    }
  };
  // before email validate verify
  function Emailvalidate(formData, errors) {
    for (const [key, value] of Object.entries(formData.Signup)) {
      if (!value) {
        errors.Signup[key].addError("Required!!");
      }
    }
    // console.log('errors',errors)
    return errors;
  }
  return (
    <Fragment>
      {validateStatus === "loading" && isLoading ? (
        <AlertBox
          message={"Please wait while verifying in..."}
          variant={alertVariant()}
        />
      ) : (
        ""
      )}
      {validateStatus !== "idle" && validateStatus !== "loading" && message ? (
        <AlertBox message={message+' redirecting to login...'} variant={alertVariant()} />
      ) : (
        ""
      )}
      <Form
        //   className="col-lg-6"
        //   liveValidate={true}
        id={"EmailForm"}
        validate={Emailvalidate}
        autoComplete="off"
        // schema={JSON.parse(data.data.formSchema)}
        // uiSchema={JSON.parse(data.data.uiSchema)}
        schema={JSON.parse(VerifyFormsource)}
        uiSchema={JSON.parse(VerifyUIsource)}
        // formData={SubmitformData}
        showErrorList={false}
        widgets={widgets}
        // onChange={onChange}
        onSubmit={onSubmit}
        onError={(e) => {
          console.log("formerror", e);
        }}
      >
        <div className={`primary_btn_module_wrapper `}>
          <button type="submit" className={`primary_btn primary_btn_padding`}>
            Verify
          </button>
        </div>
      </Form>
    </Fragment>
  );
};

function mapStateToProps(state) {
  const {
    validateStatus,
    isLoading,
    isSuccess,
    isEmailvalid,
    mailData,
    message,
  } = state.verifyEmail;
  return {
    validateStatus,
    isLoading,
    message,
    isSuccess,
    isEmailvalid,
    mailData,
  };
}
export default connect(mapStateToProps)(EmailValidate);

function isJson(str) {
  try {
    let parsed = JSON.parse(str);
  } catch (e) {
    console.log(e);
    return false;
  }
  return true;
}
