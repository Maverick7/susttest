import React, { Fragment, useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import MainPage from "../../components/layout/main";
import Navbar from "../../components/common/Navbar";
import LoginCard from "../../components/ui/loginCard";
const Login = ({ isLoggedIn, authStatus }) => {
  const router = useRouter();
  useEffect(() => {
    console.log("auth change");
    if (isLoggedIn && authStatus === "authenticated") {
      router.push("/dashboard");
    }
  }, [isLoggedIn, authStatus]);
  return (
    <Fragment>
      <MainPage>
         <Navbar />
        <LoginCard />
      </MainPage>{" "}
    </Fragment>
  );
};
const mapStateToProps = (state) => {
  const { isLoading, authStatus, message, isLoggedIn, user } = state.auth;
  return {
    isLoading,
    authStatus,
    message,
    isLoggedIn,
    user,
  };
};

export default connect(mapStateToProps, null)(Login);
