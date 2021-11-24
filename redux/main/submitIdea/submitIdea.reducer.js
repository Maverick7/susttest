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

// role => individual (single file) and team (single file) => zip or pdf or word or video
const INITIAL_STATE = {
  // status are idle =>checking (check if file exist)=> loading =>success else failed else error.
  individualIdea: {
    status: "idle",
    fileExist: false,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
  },
  teamIdea: {
    status: "idle",
    fileExist: false,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
  },
};

const submitIdeaReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    // individual submission cases
    case INDIVIDUAL_SUBMISSION_CHECKING:
      return {
        ...state,
        individualIdea: {
          ...state.individualIdea,
          fileExist: payload,
        },
      };
    case INDIVIDUAL_SUBMISSION_LOADING:
      return {
        ...state,
        individualIdea: {
          ...state.individualIdea,
          status: "loading",
          isError:false,
          isLoading: true,
        },
      };
    case INDIVIDUAL_SUBMISSION_SUCCESS:
      return {
        ...state,
        individualIdea: {
          ...state.individualIdea,
          isLoading: false,
          status: "success",
          isSuccess: payload.isSuccess,
          message: payload.message,
        },
      };
    case INDIVIDUAL_SUBMISSION_FAILED:
      return {
        ...state,
        individualIdea: {
          ...state.individualIdea,
          isLoading: false,
          status: "failed",
          isSuccess: payload.isSuccess,
          message: payload.message,
        },
      };
    case INDIVIDUAL_SUBMISSION_ERROR:
      return {
        ...state,
        individualIdea: {
          ...state.individualIdea,
          isLoading: false,
          status: "error",
          isError: true,
          message: payload.message,
        },
      };
       // team submission cases
    case TEAM_SUBMISSION_CHECKING:
      return {
        ...state,
        teamIdea: {
          ...state.teamIdea,
          fileExist: payload,
        },
      };
    case TEAM_SUBMISSION_LOADING:
      return {
        ...state,
        teamIdea: {
          ...state.teamIdea,
          status: "loading",
          isError:false,
          isLoading: true,
        },
      };
    case TEAM_SUBMISSION_SUCCESS:
      return {
        ...state,
        teamIdea: {
          ...state.teamIdea,
          isLoading: false,
          status: "success",
          isSuccess: payload.isSuccess,
          message: payload.message,
        },
      };
    case TEAM_SUBMISSION_FAILED:
      return {
        ...state,
        teamIdea: {
          ...state.teamIdea,
          isLoading: false,
          status: "failed",
          isSuccess: payload.isSuccess,
          message: payload.message,
        },
      };
    case TEAM_SUBMISSION_ERROR:
      return {
        ...state,
        teamIdea: {
          ...state.teamIdea,
          isLoading: false,
          status: "error",
          isError: true,
          message: payload.message,
        },
      };
    default:
      return state;
  }
};

export default submitIdeaReducer;

