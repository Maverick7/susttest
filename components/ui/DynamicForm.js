import { useGetFormQuery } from "../../redux/services/events";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../../redux/main/auth/auth.actions";
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
} from "../widgets/widgets";
// before Verify schema
const VerifyFormsource = `{
  "type":"object",
  "properties":{
      "Signup":{
          "type":"object",
          "title":"Please fill in this form to create an account!",
          "properties":{
              "Email":{
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
// after Verify schema
const source = `{
    "type":"object",
    "properties":{
        "Signup":{
            "type":"object",
            "title":"Please fill in this form to create an account!",
            "properties":{
                "email":{
                    "type":"string",
                    "title":"First name"
                },
                "lastName":{
                    "type":"string",
                    "title":"Last name"
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
                "ColorList":{
                    "type":"string",
                    "title":"colors",
                    "enum":[
                            "red",
                            "blue",
                            "green",
                            "purple"
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
                "pass2":{
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
        "email":{
            "ui:placeholder":"First Name",
            "ui:widget":"CustomInputField",
            "ui:widget":"hidden",
            "ui:autofocus":true
        },
        "lastName":{
            "ui:placeholder":"enter last name",
            "ui:widget":"CustomInputField"
        },
        "countries":{
            "ui:placeholder":"Choose one any 1 country",
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
        "pass2":{
            "ui:widget":"CustomPasswordField",
            "ui:placeholder":"Re-enter pwd to confirm",
            "hint":"Password should contain minimum 6 maximum 10 letters. It must have atleast one number, one upper case letter, one lower case letter and one special character among @!#$^*_+:"
        },
        "multipleChoicesList":{
            "ui:placeholder":"Choose one any tech",
            "ui:widget":"CustomChecksField"
        },
        "ColorList":{
            "ui:placeholder":"Choose one any new color",
            "ui:disabled":false,
            "ui:widget":"CustomRSingleSelectField"
        },
        "Countries":{
            "ui:placeholder":"Choose multiple countries",
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

const DynamicForm = ({ eventId }) => {
  const dispatch = useDispatch();
  console.log("dynamic form", eventId);
  const [SubmitformData, setSubmitformData] = useState();



  const onChange = ({ formData }, e) => {
    const { Signup } = formData;
    console.log("Data onchange: ", Signup);
    // setFormdata(Signup)
  };




  const onSubmit = ({ formData }, e) => {
    const { Signup } = formData;
    console.log("Data submitted: ", Signup);
    setSubmitformData(Signup);
    Object.assign(Signup, { eventId: eventId });
    dispatch(register(Signup));
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
  // before email validate verify
  function Emailvalidate(formData, errors) {
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
  const { data, isLoading, isError, error } = useGetFormQuery(eventId);
  if (isLoading) {
    return <h1>loading...</h1>;
  } else if (isError) {
    return <h1>API error</h1>;
  } else if (data.status === "error" && data.message === "eventId not Found") {
    return <h1>eventId not valid</h1>;
  } else if (data.data && !data.data.formSchema && !data.data.uiSchema) {
    return (
      <h1>
        Not proper format{isJson(data.data.formSchema) ? "crt" : "error"}and
        {isJson(data.data.uiSchema) ? "crt" : "error"}
      </h1>
    );
  }
  return (
    <Fragment>
      {true?( <Form
        //   className="col-lg-6"
        //   liveValidate={true}
        validate={Emailvalidate}
        // schema={JSON.parse(data.data.formSchema)}
        // uiSchema={JSON.parse(data.data.uiSchema)}
        schema={JSON.parse(VerifyFormsource)}
        uiSchema={JSON.parse(VerifyUIsource)}
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
            Verify
          </button>
        </div>
      </Form>):(
         <Form
         //   className="col-lg-6"
         //   liveValidate={true}
         validate={Mainvalidate}
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
      )}
     
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

export default DynamicForm;

function isJson(str) {
  try {
    let parsed = JSON.parse(str);
  } catch (e) {
    console.log(e);
    return false;
  }
  return true;
}
