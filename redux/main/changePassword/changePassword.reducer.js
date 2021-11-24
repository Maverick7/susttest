import {
  CHANGE_PASSWORD_LOADING,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILED,
  CHANGE_PASSWORD_ERROR,
} from "./changePassword.types";

const initialState = {
  changePasswdStatus: "idle",
  isLoading:false,
  isSuccess: false,
  isError: false,
  message: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_PASSWORD_LOADING:
      return {
        ...state,
        isLoading:true,
        changePasswdStatus: "loading",
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading:false,
        changePasswdStatus: "success",
        isSuccess: payload.isSuccess,
        message: payload.message,
      };
    case CHANGE_PASSWORD_FAILED:
      return {
        ...state,
        isLoading:false,
        changePasswdStatus: "failed",
        isSuccess: payload.isSuccess,
        message: payload.message,
      };
      case CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        isLoading:false,
        changePasswdStatus: "error",
        isError:true
      };
    default:
      return state;
  }
}
