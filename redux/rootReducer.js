import { combineReducers } from "redux";
import { eventsApi } from "./services/events";
import { reducer as formReducer } from "redux-form";
import dynamic from 'next/dynamic'
// const authReducer = dynamic(() => import('./main/auth/auth.reducer'), { ssr: false })
import schemaReducer from "./main/schema/schema.reducer";
import UploadReducer from "./main/uploadFile/uploadFile.reducer";
import authReducer from "./main/auth/auth.reducer";
import verifyReducer from "./main/verifyMail/verify.reducer";
import registerReducer from "./main/register/register.reducer";
import changePasswordReducer from "./main/changePassword/changePassword.reducer";
import forgotPasswordReducer from "./main/forgotPassword/forgotPassword.reducer";
import submitIdeaReducer from "./main/submitIdea/submitIdea.reducer";
import challengeReducer from "./main/challenge/challenge.reducer";

const rootReducer = combineReducers({
  form: formReducer,
  verifyEmail:verifyReducer,
  register:registerReducer,
  forgotPassword:forgotPasswordReducer,
  auth:authReducer,
  changePassword:changePasswordReducer,
  schema: schemaReducer,
  fileUpload: UploadReducer,
  submitIdea:submitIdeaReducer,
  challenge:challengeReducer,
  [eventsApi.reducerPath]: eventsApi.reducer,
});

export default rootReducer;
