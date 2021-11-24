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
import { modifyFiles } from "./uploadFile.utils";
import { produce } from "immer";

// role => individuals (single file) and team (single file) => zip or pdf or word
const INITIAL_STATE = {
// status are idle => settedup and ready to upload =>start upload => uploading => uploaded or failure or error
  individualFile: {
    status: "idle",
    fileUrl:null,
    fileObj: {
      file: undefined,
      fileName: null,
      fileType: null,
      fileSize: null,
    },
    progress: 0,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message:''
  },
  teamFile: {
    status: "idle",
    fileUrl:null,
    fileObj: {
      file: undefined,
      fileName: null,
      fileType: null,
      fileSize: null,
    },
    progress: 0,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message:''
  },
};

const fileProgressReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    // upload individualFile cases
    case SET_INDIVIDUAL_UPLOAD_FILE:
      return {
        ...state,
        individualFile: {
          ...state.individualFile,
          ...toSetFile(state.individualFile, payload),
        },
      };
    case START_INDIVIDUAL_UPLOADING_FILE:
      return {
        ...state,
        individualFile: {
          ...state.individualFile,
          isLoading: true,
          status: "uploading",
        },
      };
    case SET_INDIVIDUAL_UPLOAD_PROGRESS:
      return {
        ...state,
        individualFile: {
          ...state.individualFile,
          status: "progressing",
          progress: payload,
        },
      };

    case SUCCESS_INDIVIDUAL_UPLOAD_FILE:
      return {
        ...state,
        individualFile: {
          ...state.individualFile,
          isLoading: false,
          status: "uploaded",
          isSuccess: payload.isSuccess,
          fileUrl:payload.uploadedUrl,
          message: payload.message,
        },
      };

    case FAILURE_INDIVIDUAL_UPLOAD_FILE:
      return {
        ...state,
        individualFile: {
          ...state.individualFile,
          isLoading: false,
          status: "failed",
          isSuccess: payload.isSuccess,
          message: payload.message,
        },
      };

    case ERROR_INDIVIDUAL_UPLOAD_FILE:
      return {
        ...state,
        individualFile: {
          ...state.individualFile,
          isLoading: false,
          isSuccess: false,
          isError: true,
          status: "error",
          message: payload,
        },
      };
      
    // upload teamFile cases
    case SET_TEAM_UPLOAD_FILE:
      return {
        ...state,
        teamFile: {
          ...state.teamFile,
          ...toSetFile(state.teamFile, payload),
        },
      };
    case START_TEAM_UPLOADING_FILE:
      return {
        ...state,
        teamFile: {
          ...state.teamFile,
          isLoading: true,
          status: "uploading",
        },
      };
    case SET_TEAM_UPLOAD_PROGRESS:
      return {
        ...state,
        teamFile: {
          ...state.teamFile,
          status: "progressing",
          progress: payload,
        },
      };

    case SUCCESS_TEAM_UPLOAD_FILE:
      return {
        ...state,
        teamFile: {
          ...state.teamFile,
          isLoading: false,
          status: "uploaded",
          isSuccess: payload.isSuccess,
          fileUrl:payload.uploadedUrl,
          message: payload.message,
        },
      };

    case FAILURE_TEAM_UPLOAD_FILE:
      return {
        ...state,
        teamFile: {
          ...state.teamFile,
          isLoading: true,
          status: "failed",
          isSuccess: payload.isSuccess,
          message: payload.message,
        },
      };

    case ERROR_TEAM_UPLOAD_FILE:
      return {
        ...state,
        individualFile: {
          ...state.teamFile,
          isLoading: false,
          isError: true,
          status: "error",
          message: payload,
        },
      };
    default:
      return state;
  }
};

export default fileProgressReducer;

export function toSetFile(state, file) {
  if (file != undefined) {
    return produce(state, (draft) => {
      // setting up the file 
      draft["fileObj"]["file"] = file;
      draft["fileObj"]["fileName"] = file.name;
      draft["fileObj"]["fileType"] = file.type;
      draft["fileObj"]["fileSize"] = file.size;
      // ready to upload file
      draft["status"] = "ready";
    });
  }
}
export function toSetProgress(state, progress) {
  if (state != undefined) {
    return produce(state, (draft) => {
      draft["status"] = "progressing";
      draft["progress"] = progress;
    });
  }
}
