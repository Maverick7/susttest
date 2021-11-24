import {
  EMAIL_VERIFY_LOADING,
  EMAIL_VERIFY_SUCCESS,
  EMAIL_VERIFY_FAILURE,
  EMAIL_VERIFY_ERROR,
} from "./verify.types";

const initialState = {
  validateStatus: "idle",
  isLoading: false,
  isEmailvalid: false,
  isSuccess: false,
  isError: false,
  mailData: null,
  message: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case EMAIL_VERIFY_LOADING:
      return {
        ...state,
        isLoading: true,
        validateStatus: "loading",
      };
    case EMAIL_VERIFY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        validateStatus: "success",
        isEmailvalid: payload.isEmailvalid,
        isSuccess: payload.success,
        mailData: payload.mailData,
        message: payload.message,
      };
      case EMAIL_VERIFY_FAILURE:
      return {
        ...state,
        isLoading: false,
        validateStatus: "failed",
        isSuccess: payload.isSuccess,
        message: payload.message,
      };
    case EMAIL_VERIFY_ERROR:
      return {
        ...state,
        isLoading: false,
        validateStatus: "error",
        isError: true,
        message: payload,
      };
    default:
      return state;
  }
}
