import React, { Fragment } from "react";
import styles from '../../../styles/placeholder.module.css'

const ContentPlaceholder = () => {
  return (
    <Fragment>
      <div class={`row ${styles.placeholder_container}`}>
        <div class={`col-lg-6 col-md-12`}>
          <div className={`${styles.placeholder_wrap}`}>
            <img className={`img-fluid`} src={"/images/logo.png"} />
          </div>
        </div>
        <div class={`col-lg-6 col-md-12`}>
          <div className={`${styles.placeholder_wrap}`}>
            <div className={styles.placeholder_text}>
              <p>PlaceHolder Text</p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ContentPlaceholder;
