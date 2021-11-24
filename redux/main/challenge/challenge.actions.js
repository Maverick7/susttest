import {
  FORGOT_PASSWORD_LOADING,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_ERROR,
} from "./challenge.types.js";
import { trueChecker } from "../../../components/helpers/checker";
import forgotService from "../../services/forgotPassword/forgotPassword";
// to get current active challengeId
export const setCurrentChallenge = (challengeId) => ({
  type: "SET_CURRENT_CHALLENEGE",
  payload: challengeId,
});

export const forgotPassword = (values) => (dispatch) => {
  dispatch({ type: FORGOT_PASSWORD_LOADING });
  return forgotService.forgotPassword(values).then(
    (response) => {
      const { data } = response;
      const FPcheck = [data.success, data.status === "success"];
      if (!trueChecker(FPcheck)) {
        dispatch({
          type: FORGOT_PASSWORD_FAILED,
          payload: {
            status: data.status,
            message: data.message,
            isSuccess: data.success,
          },
        });
      } else {
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
          payload: {
            status: data.status,
            message: data.message,
            isSuccess: data.success,
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
        type: FORGOT_PASSWORD_ERROR,
        payload: message,
      });
      return Promise.reject();
    }
  );
};
