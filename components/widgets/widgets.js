import React, { useState, useEffect, Fragment } from "react";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import PopoverHeader from "react-bootstrap/PopoverHeader";
import PopoverBody from "react-bootstrap/PopoverBody";
import { Button } from "react-bootstrap";
import styles from "../../styles/widgets.module.css";
import produce from "immer";
import Select from "react-select";

// text input field widget
export const InputField = (props) => {
  console.log("input", props);
  return (
    <div className={`${styles.dynamic_input_field}`}>
      <div className={`form-group ${styles.form_input}`}>
        <input
          type="text"
          id={props.id}
          className="form-control"
          autoComplete="off"
          value={props.value}
          placeholder={props.placeholder}
          required={props.required}
          onChange={(event) => props.onChange(event.target.value)}
        />
      </div>
    </div>
  );
};
export const PasswordField = (props) => {
  console.log(props);
  const renderTooltip = (params) => (
    <Tooltip id="button-tooltip" {...params}>
      {props.uiSchema && props.uiSchema.hint}
    </Tooltip>
  );
  function Togglepassword() {
    var PasswordElement = document.getElementById(props.id);
    if (PasswordElement != null) {
      if (PasswordElement.type === "password") {
        PasswordElement.type = "text";
      } else {
        PasswordElement.type = "password";
      }
    }
  }
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h5">Password rules</Popover.Header>
      <Popover.Body>
        And here's some <strong>amazing</strong> content. It's very engaging.
        right?
      </Popover.Body>
    </Popover>
  );
  return (
    <div className="dynamic_input_field">
      <div class="input-group">
        <input
          type="password"
          class="form-control"
          id={props.id}
          placeholder={props.placeholder}
          autoComplete="off"
          value={props.value}
          placeholder={props.placeholder}
          required={props.required}
          onChange={(event) => props.onChange(event.target.value)}
          aria-describedby="basic-addon2"
        />
        <div class="input-group-append">
          <button
            onClick={Togglepassword}
            className={`${styles.pwd_btn}`}
            type="button"
          >
            <img width={20} className={`${styles.pwd_img}`} src={`/images/ic_eye.svg`} alt="visible" />
          </button>
          <OverlayTrigger
            placement="left-start"
            trigger={"click"}
            delay={{ show: 400, hide: 450 }}
            overlay={renderTooltip}
            // overlay={popover}
          >
            <button className={`${styles.hint_btn}`} type="button">
              <span>?</span>
            </button>
          </OverlayTrigger>
        </div>
      </div>
    </div>
  );
};
export const CheckBoxField = (props) => {
  // console.log(props);
  return (
    <div className="dynamic_check_field">
      <label for="sel1">{props.placeholder}</label>
      <div class="form-check">
        <label class="form-check-label">
          <input
            type="checkbox"
            class="form-check-input"
            value=""
            onChange={(e) => {
              props.onChange(e.target.checked);
            }}
          />
          <div
            className={`check_label`}
            dangerouslySetInnerHTML={{ __html: props.uiSchema.content }}
          />
        </label>
      </div>
    </div>
  );
};
// react custom singleselect
export const RSingleselect = (props) => {
  console.log(props);
  // TO get default selected index in array for selecting obj
  function getDefaultIndex() {
    let index = props.options.enumOptions.findIndex(
      (Op) => Op.value === props.schema.default
    );
    console.log("found index", index);
    return index;
  }
  // To convert normal values enumoptions
  function convertToOptions(arrOptions) {
    let allOptions = [];
    for (var i = 0; i < arrOptions.length; i++) {
      allOptions[i] = { value: arrOptions[i], label: arrOptions[i] };
    }
    return allOptions;
  }
  // To handle change in select field
  const handleChange = (selectedOption) => {
    if (selectedOption) {
      props.onChange(selectedOption.value);
    }
  };
  return (
    <Select
      className="select_single"
      classNamePrefix="single_select"
      defaultValue={
        props.schema && props.schema.default
          ? {
              value: props.schema.default,
              label: props.schema.default,
            }
          : null
      }
      placeholder={props.placeholder}
      isDisabled={props.options.disabled}
      isLoading={false}
      isClearable={true}
      isRtl={false}
      isSearchable={true}
      name="select_single"
      menuColor="red"
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: "#4D82F3",
          primary25: "#C8CBD0",
        },
      })}
      onChange={handleChange}
      options={props.options.enumOptions}
    />
  );
};

// react custom multiselect
export const RMultipleselect = (props) => {
  console.log(props);
  function convertToOptions(arrOptions) {
    let allOptions = [];
    for (var i = 0; i < arrOptions.length; i++) {
      allOptions[i] = { value: arrOptions[i], label: arrOptions[i] };
    }
    return allOptions;
  }
  function convertToValues(arrValues) {
    var selectedValues =
      arrValues.length > 0
        ? arrValues.map(function (item) {
            return item["value"];
          })
        : [];
    return selectedValues;
  }
  const handleChange = (selectedOption) => {
    if (selectedOption.length > 0) {
      var selectedValues = convertToValues(selectedOption);
      props.onChange(selectedValues);
    }
  };
  return (
    <Select
      className="multiple_select"
      classNamePrefix="multiple_select"
      defaultValue={
        props.schema && props.schema.default
          ? convertToOptions(props.schema.default)
          : null
      }
      placeholder={props.options.placeholder}
      isClearable={true}
      isSearchable={true}
      isMulti={true}
      isDisabled={props.options.disabled}
      name="multiple_single"
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: "#4D82F3",
          primary25: "#4D82F3",
        },
      })}
      onChange={handleChange}
      options={props.options.enumOptions}
    />
  );
};

export const ToggleField = (props) => {
  // console.log(props);
  return (
    <div
      class="toggle_wrap"
      style={{
        margin: "10px 0px",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <div>
        <label>I am minor below 18 age</label>
      </div>
      <div>
        <label className={`${styles.custom_control} ${styles.ios_switch}`}>
          <input
            type="checkbox"
            className={styles.ios_switch_control_input}
            onChange={(e) => {
              props.onChange(e.target.checked);
            }}
          />

          <span className={styles.ios_switch_control_indicator}></span>
        </label>
      </div>
    </div>
  );
};

export const SelectField = (props) => {
  // console.log(props)
  return (
    <div class={`${styles.form_select} form-group`}>
      {props.schema && props.schema.enum.length > 0 ? (
        <Fragment>
          <select
            class="form-control"
            id="select"
            disabled={props.options.disabled}
            onChange={(e) => {
              if (e.target.value) {
                props.onChange(e.target.value);
              }
            }}
          >
            <option hidden selected={!props.value}>
              {props.placeholder}
            </option>
            {props.schema.enum.map((item) => {
              return (
                <option selected={item && item === props.value} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </Fragment>
      ) : (
        <h2>no options selects</h2>
      )}
    </div>
  );
};
export const CheckBoxsField = (props) => {
  const [selected, setSelected] = useState([]);
  // console.log(props);
  useEffect(() => {
    props.onChange(selected);
  }, [selected]);
  return (
    <div className="dynamic_check_fields">
      <label htmlFor="placeholder">
        {props.options && props.options.placeholder}
      </label>
      {props.schema && props.schema.items.enum.length > 0 ? (
        props.schema.items.enum.map((item) => {
          return (
            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="checkbox"
                  class="form-check-input"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelected(
                        produce(selected, (draft) => {
                          draft.push(item);
                        })
                      );
                    } else {
                      setSelected(
                        produce(selected, (draft) => {
                          draft.splice(selected.indexOf(item), 1);
                        })
                      );
                    }
                  }}
                />
                {item}
              </label>
            </div>
          );
        })
      ) : (
        <h2>no options</h2>
      )}
    </div>
  );
};
