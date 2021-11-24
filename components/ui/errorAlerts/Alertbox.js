import { Fragment, useState } from "react";
import styles from "../../../styles/Alert/Alertbox.module.css";
import { Button } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
const AlertBox = ({ variant, message }) => {
  const [show, setShow] = useState(true);
  function alertICon() {
    console.log('alert variants',variant)
    switch (variant) {
      case "alert_loader":
        return (
          <img
            className="img-fluid"
            src={"/images/loader/spinner2.svg"}
            alt="icon"
          />
        );
      case "alert_success":
        return (
          <img
            className="img-fluid"
            src={"/images/alert/ic_tick.svg"}
            alt="icon"
          />
        );
      case "alert_danger":
        return (
          <img
            className="img-fluid"
            src={"/images/alert/ic_wrong.svg"}
            alt="icon"
          />
        );
      case "alert_warn":
        return (
          <img
            className="img-fluid"
            src={"/images/alert/ic_exclamation.svg"}
            alt="icon"
          />
        );
      default:
        return "";
    }
  };
  return (
    <Fragment>
      {/* alert variants are alert_loader, alert_success , alert_danger , alert_warn , alert_notify */}
      <Alert className={`${styles.alert_box}  ${styles[variant]}`} show={show}>
        <div className={`${styles.alert_message_icon}`}>{alertICon()}</div>
        <div className={`${styles.alert_message_content}`}>
          <p>{message ? message : "no error"}</p>
        </div>
        <div className={`${styles.alert_close_wrap}`}>
          <button
            className={`${styles.alert_close_btn}`}
            onClick={() => setShow(false)}
          >
            {/* <img src={"images/ic_eye.svg"} /> */}
            <span class={`${styles.close_icon}`}>&times;</span>
          </button>
        </div>
      </Alert>
    </Fragment>
  );
};
export default AlertBox;
