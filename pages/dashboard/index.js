import React, { Fragment } from "react";
import requireAuth from '../../routes/requireAuth';
import Navbar from "../../components/common/Navbar";
import styles from "../../styles/dashboard.module.css";
import ChallengesTable from "../../components/ui/Table/Challenges";
import PlaceholderContent from "../../components/ui/Placeholder/Contentph";

function Dashboard() {
  const challenges = [
    {
      title: "Integrated Digital Learning Platform",
      status1: "draft",
      status2: "submitted",
      buttontext: "VIEW",
    },
    {
      title: "Digital Divide and Disconnection",
      status1: "draft",
      status2: "draft",
      buttontext: "VIEW",
    },
    {
      title: "Absenteeism in Remote Learning",
      status1: "draft",
      status2: "submitted",
      buttontext: "VIEW",
    },
    {
      title: "Accessible Education for the Blind",
      status1: "submitted",
      status2: "submitted",
      buttontext: "SUBMIT",
    },
  ];
  return (
    <Fragment>
      <Navbar />
      <div className={`${styles.dashboard_parallax_bg}`}>
        <div className={`container`}>
          <div className={`row`}>
            <div className={`col-12`}>
              <div className={`${styles.ch_title}`}>
                <h3> TCS Sustainathon Malayasia 2021</h3>
              </div>
              <ChallengesTable />
              <PlaceholderContent />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default requireAuth(Dashboard);