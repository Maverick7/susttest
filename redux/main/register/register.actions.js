import {
  REGISTER_USER_LOADING,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  REGISTER_USER_ERROR,
} from "./register.types";

import RegisterService from "../../services/register/register.service";
export const register = (values) => (dispatch) => {
  dispatch({ type: REGISTER_USER_LOADING });
  return RegisterService.register(values).then(
    (response) => {
      const {data} = response;
      if (
        !data.success ||
        !data.status === "success"
      ) {
        dispatch({
          type: REGISTER_USER_FAILED,
          payload: {
            status: data.status,
            message: data.message,
            isSuccess: data.success,
          },
        });
      }
      else{
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: {
          status: data.status,
          message: data.message,
          isSuccess: data.success
        },
      })
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
        type: REGISTER_USER_ERROR,
        payload: message,
      });
      return Promise.reject();
    }
  );
};
