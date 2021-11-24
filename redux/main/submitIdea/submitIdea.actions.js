import {
  INDIVIDUAL_SUBMISSION_CHECKING,
  INDIVIDUAL_SUBMISSION_LOADING,
  INDIVIDUAL_SUBMISSION_SUCCESS,
  INDIVIDUAL_SUBMISSION_FAILED,
  INDIVIDUAL_SUBMISSION_ERROR,
  TEAM_SUBMISSION_CHECKING,
  TEAM_SUBMISSION_LOADING,
  TEAM_SUBMISSION_SUCCESS,
  TEAM_SUBMISSION_FAILED,
  TEAM_SUBMISSION_ERROR,
} from "./submitIdea.types";
import authService from "../../services/auth/authService";
import { trueChecker } from "../../../components/helpers/checker";

export const setUploadIndividualFile = (file) => ({
  type: SET_INDIVIDUAL_UPLOAD_FILE,
  payload: file,
});
export const setUploadTeamFile = (file) => ({
  type: SET_TEAM_UPLOAD_FILE,
  payload: file,
});


// individual submission
export const individualIdeaSubmit = (values) => (dispatch) => {
  console.log(values);
  dispatch({ type: INDIVIDUAL_SUBMISSION_LOADING });
  return authService.submitIdea(values).then(
    (response) => {
      const { data } = response;
      const FPcheck = [data.success, data.status === "success"];
      if (!trueChecker(FPcheck)) {
        dispatch({
          type: INDIVIDUAL_SUBMISSION_FAILED,
          payload: {
            status: data.status,
            message: data.message,
            isSuccess: data.success,
          },
        });
      } else {
        dispatch({
          type: INDIVIDUAL_SUBMISSION_SUCCESS,
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
        type: INDIVIDUAL_SUBMISSION_ERROR,
        payload: message,
      });
      return Promise.reject();
    }
  );
};

// team submission
export const teamIdeaSubmit = (values) => (dispatch) => {
  console.log(values);
  dispatch({ type: TEAM_SUBMISSION_LOADING });
  return authService.submitIdea(values).then(
    (response) => {
      const { data } = response;
      const FPcheck = [data.success, data.status === "success"];
      if (!trueChecker(FPcheck)) {
        dispatch({
          type: TEAM_SUBMISSION_FAILED,
          payload: {
            status: data.status,
            message: data.message,
            isSuccess: data.success,
          },
        });
      } else {
        dispatch({
          type: TEAM_SUBMISSION_SUCCESS,
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
        type: TEAM_SUBMISSION_ERROR,
        payload: message,
      });
      return Promise.reject();
    }
  );
};
