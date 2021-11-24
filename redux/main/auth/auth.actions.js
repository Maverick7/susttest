import {
  LOGIN_CHECK,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_ERROR,
  LOGOUT_INITIATE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_ERROR,
  SET_MESSAGE,
  CLEAR_MESSAGE,
} from "./auth.types";

import AuthService from "../../services/auth/authService";

export const setMessage = (message) => ({
  type: SET_MESSAGE,
  payload: message,
});

export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});

export const login = (values) => (dispatch) => {
  dispatch({ type: LOGIN_CHECK });
  return AuthService.login(values).then(
    (data) => {
      if (
        !data ||
        !data.data ||
        !data.data.accessToken ||
        !data.success ||
        !data.status === "success"
      ) {
        dispatch({
          type: LOGIN_FAIL,
          payload: {
            status: data.status,
            message: data.message,
            isAuthenticated: data.success,
          },
        });
      } else {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            user: data.data,
            status: data.status,
            message: data.message,
            isAuthenticated: data.success,
          },
        });
      }

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: LOGIN_ERROR,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT_INITIATE,
  });
  AuthService.logout().then(
    (response) => {
      const { data } = response;
      if (!data || !data.success || !data.status === "success") {
        dispatch({
          type: LOGOUT_FAILURE,
          payload: {
            status: data.status,
            message: data.message,
          },
        });
      } else {
        dispatch({
          type: LOGOUT_SUCCESS,
          payload: {
            message: data.message,
            isUnauthenticated: data.success,
          },
        });
        localStorage.removeItem("user");
      }
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: LOGOUT_ERROR,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
