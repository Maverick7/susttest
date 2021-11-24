import {
  EMAIL_VERIFY_LOADING,
  EMAIL_VERIFY_ERROR,
  EMAIL_VERIFY_FAILURE,
  EMAIL_VERIFY_SUCCESS,
} from "./verify.types";
import { withRouter } from "next/router";
import AuthService from "../../services/auth/authService";

export const verifyEmail = (values) => (dispatch) => {
  dispatch({ type: EMAIL_VERIFY_LOADING });
  return AuthService.verifyId(values).then(
    (response) => {
      console.log(response);
      const { data } = response;
      if ( !data.success || !data.status === "success") {
        dispatch({
          type: EMAIL_VERIFY_FAILURE,
          payload: {
            isEmailvalid: data.isEmailValid,
            isSuccess: data.success,
            mailData: data.data,
            message: data.message,
            status: data.status
          }})
      } else {
        dispatch({
          type: EMAIL_VERIFY_SUCCESS,
          payload: {
            isEmailvalid: data.isEmailValid,
            status: data.status,
            mailData: data.data,
            message: data.message,
            isSuccess: data.success,
          },
        });
      }

      return Promise.resolve();
    },
    (error) => {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: EMAIL_VERIFY_ERROR,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
