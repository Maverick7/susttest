import React, { Fragment } from "react";
import MainPage from "../../components/layout/main";
import Navbar from "../../components/common/Navbar";
import ForgotCard from "../../components/ui/ForgotCard";


const SignUp = () => {
  return (
    <Fragment>
      <MainPage>
        <Navbar />
        <ForgotCard />
      </MainPage>
    </Fragment>
  );
};

export default SignUp;
