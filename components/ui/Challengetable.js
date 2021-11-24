import React, { Fragment } from "react";
import styles from "../../styles/table.module.css";

export default function Home() {
  const challenges = [
    {
      title: "Integrated Digital Learning Platform",
      status1: "draft",
      status2: "submitted",
      buttontext: "VIEW",
    },
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
  ];
  return (
    <div className={`${styles.maincontainer} ${styles.dashboard_parallax_bg}`}>
      <div class={`container`}>
        <p class={styles.largetext1}>TCS Malayasia 2021</p>
        {/* <p class={styles.largetext2}>Please submit your proposals below</p> */}
        <div class="table-responsive-md">
          <table class="table table-bordered">
            <thead>
              <tr className={styles.tableheading}>
                <th className={`${styles.chtabel_head} align-middle`}>
                  Challenge Name
                </th>
                <th className={`${styles.chtabel_head} align-middle`}>
                  <div className={styles.maintxt}>
                    <p> Individual status</p>
                  </div>
                </th>
                <th className={`${styles.chtabel_head} align-middle`}>
                  <div className={styles.maintxt}>
                    <p>Team status</p>
                  </div>
                </th>
              </tr>
            </thead>

            <tbody className={styles.tablebody}>
              {challenges.map((challengeinfo) => {
                return (
                  <tr>
                    <td>{challengeinfo.title}</td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          flexWrap:'wrap',
                          justifyContent: "space-between",
                          flexDirection: "row",
                        }}
                      >
                        <p>{challengeinfo.status1} </p>
                        <button className={styles.buttonclass}>
                          {challengeinfo.buttontext}
                        </button>
                      </div>
                    </td>
                    <td>
                    <div
                        style={{
                          display: "flex",
                          flexWrap:'wrap',
                          justifyContent: "space-between",
                          flexDirection: "row",
                        }}
                      >
                        <p>{challengeinfo.status2} </p>
                        <button className={styles.buttonclass}>
                          {challengeinfo.buttontext}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div class={`row ${styles.placeholder_container}`}>
          <div class={`col-lg-6 col-md-12 border`}>
            <div className={`${styles.placeholder_wrap}`}>
              <img className={`img-fluid`} src={"/images/logo.png"} />
            </div>
          </div>
          <div class={`col-lg-6 col-md-12 border`}>
            <div className={`${styles.placeholder_wrap}`}>
              <div className={styles.placeholder_text}>
                <p>PlaceHolder Text</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
