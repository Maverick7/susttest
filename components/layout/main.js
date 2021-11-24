import React, { Fragment } from "react";
import RegisterCard from "../ui/registerCard";
import styles from "../../styles/mainPage.module.css";

const MainPage = (props) => {
  console.log(props.scrollable);
  return (
    <Fragment>
      <div
        class={`${styles.main_bg_wrap}`}
      >
        {props.children}
      </div>
    </Fragment>
  );
};

export default MainPage;
