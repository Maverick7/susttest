import React, { Fragment } from "react";
import { NavLink } from "./NavLink";
import { trueChecker } from "../helpers/checker";
import { logout } from "../../redux/main/auth/auth.actions";
import { useRouter } from "next/router";
import styles from "../../styles/Navbar.module.css";
import { useDispatch, connect } from "react-redux";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import Link from "next/link";
const Navbar1 = ({
  isLoading,
  authStatus,
  inMessage,
  isLoggedIn,
  user,
  signOut,
}) => {
  const LogoutHandler = () => {
    signOut();
    // router.push('login')
  };

  const unauthLinks = (
    <Fragment>
      <NavLink
        href="/login"
        exact
        activeClassName={`${styles.nav_active_link}`}
        className={`nav-link ${styles.nav_custom_link}`}
      >
        Login
      </NavLink>
      <NavLink
        href={"/?id=SG2021"}
        exact
        activeClassName={`${styles.nav_active_link}`}
        className={`nav-link ${styles.nav_custom_link} ${styles.primary_btn}`}
      >
        <div
          className={`${styles.primary_btn_module_wrapper} ${styles.primary_btn_padding}`}
        >
          Register
        </div>
      </NavLink>
    </Fragment>
  );
  const authLinks = (
    <Fragment>
      <NavLink
        href="/dashboard"
        exact
        activeClassName={`${styles.nav_active_link}`}
        className={`nav-link ${styles.nav_custom_link} `}
      >
        Submission Dashboard
      </NavLink>
      <NavLink
        href={"/resetPassword"}
        exact
        activeClassName={`${styles.nav_active_link}`}
        className={`nav-link  ${styles.nav_custom_link} `}
      >
        Reset password
      </NavLink>

      <a onClick={LogoutHandler} className={`nav-link ${styles.nav_custom_link}`}>
        Log out
      </a>
    </Fragment>
  );

  return (
    <Navbar
      className={`${styles.nav_bg}`}
      fixed="top"
      collapseOnSelect
      expand="lg"
    >
      <Container fluid>
        <Navbar.Brand>
          <Link href={"/"}>
            <a>
              <img
                className={`img-fluid ${styles.tcs_logo}`}
                src={"/images/logo.png"}
                alt="TCS sustainathon"
              />
            </a>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle
          data-target="#collapseMenu"
          data-toggle="collapse"
          aria-controls="collapseMenu"
          aria-expanded={false}
        >
          <div className={`menubar_container`}>
            <div class={`bar1`}></div>
            <div class={`bar2`}></div>
            <div class={`bar3`}></div>
          </div>
        </Navbar.Toggle>
        <Navbar.Collapse id="collapseMenu">
          <Nav className={`${styles.align_nav_right}`}>
            {trueChecker([authStatus === "authenticated", isLoggedIn])
              ? authLinks
              : unauthLinks}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
const mapStateToProps = (state) => {
  const { isLoading, authStatus, inMessage, isLoggedIn, user } = state.auth;
  return {
    isLoading,
    authStatus,
    inMessage,
    isLoggedIn,
    user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar1);
