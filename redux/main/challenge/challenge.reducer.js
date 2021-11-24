import {
  FORGOT_PASSWORD_LOADING,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_ERROR,
} from "./challenge.types";

const initialState = {
  currentChallengeId:'',
  forgotPasswdStatus: "idle",
  isLoading:false,
  isSuccess: false,
  isError: false,
  message: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'SET_CURRENT_CHALLENEGE':
      return {
        ...state,
        currentChallengeId:payload,
      };
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
