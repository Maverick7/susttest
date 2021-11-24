import {
  FORGOT_PASSWORD_LOADING,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_ERROR,
} from "./forgotPassword.types";

const initialState = {
  forgotPasswdStatus: "idle",
  isLoading:false,
  isSuccess: false,
  isError: false,
  message: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FORGOT_PASSWORD_LOADING:
      return {
        ...state,
        isLoading:true,
        isError:false,
        forgotPasswdStatus: "loading",
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading:false,
        forgotPasswdStatus: "success",
        isSuccess: payload.isSuccess,
        message: payload.message,
      };
    case FORGOT_PASSWORD_FAILED:
      return {
        ...state,
        isLoading:false,
        forgotPasswdStatus: "failed",
        isSuccess: payload.isSuccess,
        message: payload.message,
      };
      case FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        isLoading:false,
        forgotPasswdStatus: "error",
        isError:true
      };
    default:
      return state;
  }
}
