import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// export default function withAuth(WrappedComponent) {
//   const Component = ({
//     authStatus,
//     isLoading,
//     isAuthenticated,
//     isLoggedIn,
//   }) => {
//   const router = useRouter();
//     const [isAuth, setAuth] = useState(false);

//     useEffect(() => {
//       console.log("before auth state", isAuth);
//       console.log(
//         "setting..",
//         authStatus === "authenticated" && isAuthenticated && isLoggedIn
//       );
//       setAuth(authStatus === "authenticated" && isAuthenticated && isLoggedIn);
//       console.log("after auth state", isAuth);
//       if(!isAuthenticated && !isLoggedIn){
//           router.push('/login')
//       }
//     }, [authStatus, isAuthenticated, isLoggedIn]); //forgot dependency here
//     if (isLoading) {
//       return <h1>loading...</h1>;
//     } else if (authStatus === "authenticated" && isAuthenticated && isLoggedIn) {
//       return <WrappedComponent />;
//     } else {
//       return <h1>unauthenticated</h1>;
//     }
//   };
//   const mapStateToProps = (state) => {
//     const { authStatus, isLoading, isAuthenticated, isLoggedIn } = state.auth;
//     return {
//       authStatus,
//       isLoading,
//       isAuthenticated,
//       isLoggedIn,
//     };
//   };

//   const mapDispatchToProps = (dispatch) => {
//     return {
//       setAuth: (status) => dispatch(setAuth(status)),
//     };
//   };

//   return connect(mapStateToProps, null)(Component);
// }

export default function (ComposedComponent) {
  class Authenticate extends React.Component {
    // static propTypes = {
    //   authStatus: PropTypes.string,
    //   isLoading: PropTypes.bool,
    //   isAuthenticated: PropTypes.bool,
    //   isLoggedIn: PropTypes.bool,
    //   redirect:PropTypes.func.isRequired
    // };
    componentDidMount() {
      this._checkandRedirect();
    }
    componentDidUpdate() {
      this._checkandRedirect();
    }
    _checkandRedirect() {
      const { authStatus, isLoading, isAuthenticated, isLoggedIn  } = this.props;
      // main authChecker to check if all true , only all true return true , else false
      let authChecker = arr => arr.every(v => v === true);
      const authArray = [isAuthenticated, authStatus==='authenticated' , isLoggedIn];
      if (!authChecker(authArray)) {
        Router.push("login")
      }
    }
    render() {
      // if(this.props.isLoading){
      //   return(<h1>auth changing...</h1>)
      // }
      return (
        <Fragment>
          {this.props.isAuthenticated ? (
            <ComposedComponent />
          ) : (
            <h1>unauthenticated</h1>
          )}
        </Fragment>
      );
    }
  }
  const mapStateToProps = (state) => {
    const { authStatus, isLoading, isAuthenticated, isLoggedIn } = state.auth;
    return {
      authStatus,
      isLoading,
      isAuthenticated,
      isLoggedIn,
    };
  };

  return connect(mapStateToProps, null)(Authenticate);
}
