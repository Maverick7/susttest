import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { setCurrentChallenge } from "../../redux/main/challenge/challenge.actions";
import Navbar from "../../components/common/Navbar";
import ChallengeSubmission from "../../components/layout/Mainchallenge";

let SubmitChallenge = ({ setActiveChallenge, id }) => {
  useEffect(() => {
    setActiveChallenge(id);
  }, []);
  return (
    <Fragment>
      <Navbar />
      <div
        style={{
          paddingTop: "80px",
        }}
        id={`Submit_Your_Idea`}
        className={`challenge_submit_idea`}
      >
        <ChallengeSubmission />
      </div>
    </Fragment>
  );
};
export async function getServerSideProps(context) {
  const { id } = context.query;
  return {
    props: {
      id: id || null,
    },
  };
}

// function mapStateToProps(state) {
//   const { isLoading, authStatus, inMessage, isLoggedIn, user } = state.auth;
//   return {
//     isLoading,
//     authStatus,
//     inMessage,
//     isLoggedIn,
//     user,
//   };
// }
const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChallenge: (id) => dispatch(setCurrentChallenge(id)),
  };
};

export default connect(null, mapDispatchToProps)(SubmitChallenge);
