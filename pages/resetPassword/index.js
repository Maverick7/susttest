import React, { Fragment } from "react";
import MainPage from "../../components/layout/main";
import Navbar from "../../components/common/Navbar";
import ResetCard from "../../components/ui/resetCard";


const resetPassword = () => {
  return (
    <Fragment>
      <MainPage>
        <Navbar />
        <ResetCard />
      </MainPage>
    </Fragment>
  );
};

export default resetPassword;
