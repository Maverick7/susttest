import {
  REGISTER_USER_LOADING,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  REGISTER_USER_ERROR,
} from "./register.types";

const initialState = {
  registerStatus: "idle",
  isLoading:false,
  isSuccess: false,
  isError: false,
  message: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_USER_LOADING:
      return {
        ...state,
        isLoading:true,
        registerStatus: "loading",
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        isLoading:false,
        registerStatus: "success",
        isSuccess: payload.isSuccess,
        message: payload.message,
      };
    case REGISTER_USER_FAILED:
      return {
        ...state,
        isLoading:false,
        validateStatus: "failed",
        isSuccess: payload.isSuccess,
        message: payload.message,
      };
      case REGISTER_USER_ERROR:
      return {
        ...state,
        isLoading:false,
        registerStatus: "error",
        isError:true
      };
    default:
      return state;
  }
}
