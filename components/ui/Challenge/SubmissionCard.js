import React, { Fragment } from "react";
import styles from '../../../styles/SubmissionCard.module.css'
import ChallengeSubmission from '../../pages/ChallengeSubmission'

const SubmissionCard = () => {
  return (
    <Fragment>
      <div className={`${styles.chsub_card}`}>
        <ChallengeSubmission  />
      </div>
    </Fragment>
  );
};

export default SubmissionCard;
