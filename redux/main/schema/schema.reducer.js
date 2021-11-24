const initialState = {
  //  emaiVerify form
  emailVerifySchema: {
    formSchema: null,
    uiSchema: null,
  },
  mainSchema: {
    formSchema: null,
    uiSchema: null,
  },
  isLoading: false,
  formStatus: "idle",
  isSuccess: false,
  isData: false,
  isError: false,
  message: null,
};
const schemaReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "FETCH_SCHEMA_LOADING":
      return {
        ...state,
        formStatus: "loading",
        isLoading: true,
      };
      case "FETCHED_NO_SCHEMA":
        return {
          ...state,
          formStatus: "success",
          isData: false,
          isSuccess: payload.success,
          message: 'NO DATA',
        }
    case "FETCH_SCHEMA_SUCCESS":
      return {
        ...state,
        formStatus: "success",
        isData: true,
        isSuccess: payload.success,
        message: payload.message,
        emailVerifySchema: {
          formSchema: payload.data.EmailFormSchema,
          uiSchema: payload.data.EmailUISchema,
        },
        mainSchema: {
          formSchema: payload.data.mainFormSchema,
          uiSchema: payload.data.mainUISchema,
        },
      };
    case "FETCH_SCHEMA_ERROR":
      return {
        ...state,
        isError: true,
      };
    default:
      return state;
  }
};

export default schemaReducer;
