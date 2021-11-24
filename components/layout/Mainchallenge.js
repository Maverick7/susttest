import React, { Fragment } from "react";
import ContentBox from "../ui/Challenge/ContentBox";
import SubmissionCard from "../ui/Challenge/SubmissionCard";
import styles from '../../styles/Contentbox.module.css'

const MainChallenge = () => {
  return (
    <Fragment>
        <div className={`container-fluid `}>
      <div className={`row ${styles.challenge_main_row} ${styles.challenge_parallax_bg}`}>
        <div className={`col-lg-7 col-md-12 col-sm-12 ${styles.challenge_content_col}`}>
          <div className={`${styles.challenge_content_wrap}`}>
            <ContentBox  />
          </div>
        </div>
        <div className={`col-lg-5 col-md-12 col-sm-12 ${styles.challenge_content_co}`}>
          <div className={`${styles.challenge_card_wrap}`}>
            <SubmissionCard  />
          </div>
        </div>
      </div>
      </div>
    </Fragment>
  );
};

export default MainChallenge;


