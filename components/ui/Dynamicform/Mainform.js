import { useGetFormQuery } from "../../../redux/services/events";
import Loader from "../loader/loader";
import { connect } from "react-redux";
import AlertBox from "../errorAlerts/Alertbox";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../../../redux/main/register/register.actions";
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
import RegisterSuccess from "../cards/RegisterSuccess";

// after Verify schema
const source = `{
    "type":"object",
    "properties":{
        "Signup":{
            "type":"object",
            "title":"Please fill in this form to create an account!",
            "properties":{
                "Name":{
                    "type":"string",
                    "title":"name"
                },
                "CollegeName":{
                    "type":"string",
                    "title":"Full Name of your college"
                },
                "studentType":{
                    "type":"string",
                    "enum":[
                        "UG/PG",
                        "School students",
                        "others"
                    ]
                },
                "countries":{
                    "type":"string",
                    "enum":[
                        "PUNE",
                        "MALAYSIA",
                        "SINGAPORE",
                        "US",
                        "Other"
                    ]
                },
                "multipleChoicesList":{
                    "type":"array",
                    "title":"Interested techologies",
                    "items":{
                        "type":"string",
                        "enum":[
                            "IOT",
                            "DL",
                            "ML",
                            "blockChain"
                        ]
                    },
                    "uniqueItems":true
                },
                "State":{
                    "type":"string",
                    "title":"states",
                    "enum":[
                            "Johor",
                            "Kedah",
                            "Kelantan",
                            "Malacca",
                            "Negeri",
                            "Sembilan",
                            "Pahang"
                        ]
                },
                "Countries":{
                    "type":"array",
                    "title":"countries",
                    "items":{
                        "type":"string",
                        "enum":[
                            "malaysia",
                            "pune",
                            "asia",
                            "philippens"
                        ]
                    },
                    "uniqueItems":true
                },
                "password":{
                    "type":"string",
                    "title":"Password",
                    "minLength":5
                },
                "confirmPassword":{
                    "type":"string",
                    "title":"confirm Password"
                },
                "above18":{
                    "title":"I am a minor(Below 18 years) ",
                    "type":"boolean"
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
const Uisource = `{
    "Signup":{
        "Name":{
            "ui:placeholder":"Enter Name",
            "ui:widget":"CustomInputField"
        },
        "countries":{
            "ui:placeholder":"Select your country",
            "ui:disabled":false,
            "ui:widget":"CustomSelect"
        },
        "studentType":{
            "ui:placeholder":"Are you UG/PG  or school student",
            "ui:disabled":false,
            "ui:widget":"CustomSelect"
        },
        "CollegeName":{
            "ui:placeholder":"Full name of your school or college",
            "ui:widget":"CustomInputField",
            "ui:disabled":false
        },
        "password":{
            "ui:widget":"CustomPasswordField",
            "ui:placeholder":"password",
            "hint":"Password should contain minimum 6 maximum 10 letters. It must have atleast one number, one upper case letter, one lower case letter and one special character among @!#$^*_+:"
        },
        "confirmPassword":{
            "ui:widget":"CustomPasswordField",
            "ui:placeholder":"Re-enter pwd to confirm",
            "hint":"Password should contain minimum 6 maximum 10 letters. It must have atleast one number, one upper case letter, one lower case letter and one special character among @!#$^*_+:"
        },
        "multipleChoicesList":{
            "ui:placeholder":"Choose one any tech",
            "ui:widget":"CustomChecksField"
        },
        "State":{
            "ui:placeholder":"Select your state",
            "ui:disabled":false,
            "ui:widget":"CustomRSingleSelectField"
        },
        "Countries":{
            "ui:placeholder":"Choose country",
            "ui:disabled":false,
            "ui:widget":"CustomRMultiSelectField"
        },
        "above18":{
            "ui:widget":"CustomToggle"
        },
        "AcceptTerms":{
            "ui:widget":"CustomCheckField",
            "content":"<p>I agree to be contacted by TCS based on information above. For details on how we handle your personal data, please refer to <a href='#'>Terms of Use</a> , <a href='#'>Privacy Terms</a> and <a href='#'>Rules & Regulation</a>. I, declare all information provided in the form is true and accurate.</p>"
        }
    }
  }`;

const Mainform = ({
  validateStatus,
  isEmailvalid,
  mailData,
  registerStatus,
  isLoading,
  isSuccess,
  message
}) => {
  const dispatch = useDispatch();

  const [SubmitformData, setSubmitformData] = useState();
  const alertVariant = () => {
    if (registerStatus === "success") {
      return "alert_success";
    } else if (registerStatus === "failed" || registerStatus === "error") {
      return "alert_danger";
    } else if (registerStatus === "loading" || isLoading) {
      return "alert_loader";
    }
  };

  const onChange = ({ formData }, e) => {
    const { Signup } = formData;
    console.log("Data onchange: ", Signup);
    // setFormdata(Signup)
  };
  function generateSubmitData(formData) {
    // without confirmPassword
    const { confirmPassword, ...mainObj } = formData;
    // combine with verified maildata
    const submitData = { ...mainObj, ...mailData };
    console.log("main submitting data", submitData);
    return submitData;
  }
  const onSubmit = ({ formData }, e) => {
    const { Signup } = formData;
    console.log("Data submitted: ", Signup);
    generateSubmitData(Signup);
    setSubmitformData(Signup);
    // to combine pwd and add emailId and eventId login
    dispatch(register(generateSubmitData(Signup)));
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
  // after email valid register submit
  function Mainvalidate(formData, errors) {
    for (const [key, value] of Object.entries(formData.Signup)) {
      if (!value) {
        errors.Signup[key].addError("Required!!");
      }
    }
    if (formData.Signup.password !== formData.Signup.pass2) {
      errors.Signup.pass2.addError("Passwords don't match");
    }
    // console.log('errors',errors)
    return errors;
  }
  if (isLoading) {
    return <Loader />;
  }
  if (isSuccess && registerStatus === "success") {
    return <RegisterSuccess message={message} />;
  }
  return (
    <Fragment>
      {validateStatus === "success" && !isEmailvalid ? (
        <AlertBox
          message={`${mailData.email} verified succesfully`}
          variant={"alert_success"}
        />
      ) : (
        ""
      )}
      {registerStatus === "loading" && isLoading ? (
        <AlertBox
          message={"Please wait Logging in..."}
          variant={alertVariant()}
        />
      ) : (
        ""
      )}
      {registerStatus !== "idle" && registerStatus !== "loading" && message ? (
        <AlertBox message={message} variant={alertVariant()} />
      ) : (
        ""
      )}
      <h6>
        <strong>
        {`${mailData.email} Id can register account for ${mailData.eventId} event`}
        </strong>
       </h6>
      <Form
        //   className="col-lg-6"
        //   liveValidate={true}
        // validate={Mainvalidate}
        // schema={JSON.parse(data.data.formSchema)}
        // uiSchema={JSON.parse(data.data.uiSchema)}
        schema={JSON.parse(source)}
        uiSchema={JSON.parse(Uisource)}
        showErrorList={false}
        widgets={widgets}
        onChange={onChange}
        onSubmit={onSubmit}
        onError={(e) => {
          console.log("formerror", e);
        }}
      >
        <div className={`primary_btn_module_wrapper `}>
          <button type="submit" className={`primary_btn primary_btn_padding`}>
            Register
          </button>
        </div>
      </Form>

      {SubmitformData ? (
        <h4
          style={{
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {JSON.stringify(SubmitformData, null, 2)}
        </h4>
      ) : (
        ""
      )}
    </Fragment>
  );
};
function mapStateToProps(state) {
  const { registerStatus, isLoading, isSuccess, message } = state.register;
  const { validateStatus, isEmailvalid, mailData } = state.verifyEmail;
  return {
    // validate email data
    validateStatus,
    isEmailvalid,
    mailData,
    // register data
    registerStatus,
    isLoading,
    isSuccess,
    message,
  };
}
export default connect(mapStateToProps)(Mainform);

function isJson(str) {
  try {
    let parsed = JSON.parse(str);
  } catch (e) {
    console.log(e);
    return false;
  }
  return true;
}
