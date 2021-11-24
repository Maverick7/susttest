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

// const user = JSON.parse(localStorage.getItem("user"));

//   const initialState = user
//     ? { isLoggedIn: true, user }
//     : { isLoggedIn: false, user: null };
const initialState = {
  authStatus: "idle",
  unauthStatus: "idle",
  isLoading: false,
  isLoggedIn: false,
  isError: false,
  isAuthenticated: false,
  user: null,
  inError: null,
  outError: null,
  inMessage: null,
  outMessage: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_CHECK:
      return {
        ...state,
        authStatus: "authenticating",
        isError: false,
        error: null,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        authStatus: "authenticated",
        isLoading: false,
        isLoggedIn: true,
        isAuthenticated: payload.isAuthenticated,
        user: payload.user,
        inMessage: payload.message,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        authStatus: "failed",
        isLoggedIn: false,
        isAuthenticated: payload.isAuthenticated,
        inMessage: payload.message,
        user: null,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        authStatus: "error",
        isError: true,
        error: payload,
      };
    case LOGOUT_INITIATE:
      return {
        ...state,
        unauthStatus: "signingoff",
        isLoading: true,
        isError: false,
        error: null,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        authStatus:"unauthenticated",
        unauthStatus: "signedoff",
        isLoading:false,
        isLoggedIn: false,
        isAuthenticated: !payload.isUnauthenticated,
        user: null,
        inMessage:null,
        outMessage: payload.message,
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        unauthStatus: "failure",
        isLoading:false,
        outMessage: payload.message,
      };
    case LOGOUT_ERROR:
      return {
        ...state,
        unauthStatus: "error",
        isError: true,
        error: payload,
      };
    default:
      return state;
  }
}
