import React, { Fragment } from "react";
import Link from 'next/link'
import styles from "../../../styles/table.module.css";

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
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                  >
                    <p>{challengeinfo.status1} </p>
                    <Link href='challenge/1'>
                      <button className={styles.buttonclass}>
                      {challengeinfo.buttontext}
                      </button>
                      </Link>
                  </div>
                </td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                  >
                    <p>{challengeinfo.status2} </p>
                   
                      <Link href='challenge/1'>
                      <button className={styles.buttonclass}>
                      {challengeinfo.buttontext}
                      </button>
                      </Link>
                      
             
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
