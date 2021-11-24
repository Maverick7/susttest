import {
  SET_INDIVIDUAL_UPLOAD_FILE,
  START_INDIVIDUAL_UPLOADING_FILE,
  SET_INDIVIDUAL_UPLOAD_PROGRESS,
  SUCCESS_INDIVIDUAL_UPLOAD_FILE,
  FAILURE_INDIVIDUAL_UPLOAD_FILE,
  ERROR_INDIVIDUAL_UPLOAD_FILE,
  SET_TEAM_UPLOAD_FILE,
  START_TEAM_UPLOADING_FILE,
  SET_TEAM_UPLOAD_PROGRESS,
  SUCCESS_TEAM_UPLOAD_FILE,
  FAILURE_TEAM_UPLOAD_FILE,
  ERROR_TEAM_UPLOAD_FILE,
} from "./uploadFile.types";
import authService from "../../services/auth/authService";
import { trueChecker } from "../../../components/helpers/checker";
import { getBase64 } from "./uploadFile.utils";

export const setUploadIndividualFile = (file) => ({
  type: SET_INDIVIDUAL_UPLOAD_FILE,
  payload: file,
});
export const setUploadTeamFile = (file) => ({
  type: SET_TEAM_UPLOAD_FILE,
  payload: file,
});
async function generateUploadFileData(orgFile,user) {
  // requires fileobj , base64 , userRef (email and eventId)
  //getting without org file
  const { file, ...mainFile } = orgFile;
  // combine with base64 data
  const base64File = await getBase64(orgFile.file);
  return {
    ...mainFile,
    ...base64File,
    ...user,
  };
}


// team upload file
export const individualUploadFile = (orgFile, user) => (dispatch) => {
  console.log(orgFile);
  async function generateUploadFileData() {
    // requires fileobj , base64 , userRef (email and eventId)
    //getting without org file
    const { file, ...mainFile } = orgFile;
    // combine with base64 data
    const base64File = await getBase64(orgFile.file);
    return {
      ...mainFile,
      ...base64File,
      ...user,
    };
  }
  // async fn to upload file to endpt
  async function fileUpload() {
    dispatch({ type: START_INDIVIDUAL_UPLOADING_FILE });
    authService.upload(await generateUploadFileData()).then(
      (response) => {
        const { data } = response;
        const uploadCheck = [data.success, data.status === "success"];
        if (!trueChecker(uploadCheck)) {
          dispatch({
            type: FAILURE_INDIVIDUAL_UPLOAD_FILE,
            payload: {
              status: data.status,
              message: data.message,
              isSuccess: data.success,
            },
          });
        } else {
          dispatch({
            type: SUCCESS_INDIVIDUAL_UPLOAD_FILE,
            payload: {
              status: data.status,
              message: data.message,
              uploadedUrl:data.data.url,
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
          type: ERROR_INDIVIDUAL_UPLOAD_FILE,
          payload: message,
        });
        return Promise.reject();
      }
    );
  }
  if (orgFile) {
    fileUpload();
  }
};

// team upload file
export const teamUploadFile = (orgFile, user) => (dispatch) => {
  console.log(orgFile);
  // async fn to upload file to endpt
  async function fileUpload() {
    dispatch({ type: START_TEAM_UPLOADING_FILE });
    authService.upload(await generateUploadFileData(orgFile,user)).then(
      (response) => {
        const { data } = response;
        const uploadCheck = [data.success, data.status === "success"];
        if (!trueChecker(uploadCheck)) {
          dispatch({
            type: FAILURE_TEAM_UPLOAD_FILE,
            payload: {
              status: data.status,
              message: data.message,
              isSuccess: data.success,
            },
          });
        } else {
          dispatch({
            type: SUCCESS_TEAM_UPLOAD_FILE,
            payload: {
              status: data.status,
              message: data.message,
              uploadedUrl:data.data.url,
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
          type: ERROR_TEAM_UPLOAD_FILE,
          payload: message,
        });
        return Promise.reject();
      }
    );
  }
  if (orgFile) {
    fileUpload();
  }
};