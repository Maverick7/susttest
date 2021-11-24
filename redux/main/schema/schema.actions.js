import {
  FETCH_SCHEMA_LOADING,
  FETCH_SCHEMA_SUCCESS,
  FETCH_SCHEMA_ERROR,
  FETCHED_NO_SCHEMA,
} from "./schema.types";
import SchemaService from "../../services/schema/schema.service";

export const getSchema = (id) => (dispatch) => {
  dispatch({ type: FETCH_SCHEMA_LOADING });
  return SchemaService.getallSchema(id).then(
    (response) => {
      console.log(response);
      const { data } = response;
      if (
        !data ||
        !data.data.EmailFormSchema ||
        !data.data.EmailUISchema ||
        !data.data.mainFormSchema ||
        !data.data.mainUISchema
      ) {
        dispatch({
          type: FETCHED_NO_SCHEMA,
          payload: {
            success: data.success,
          },
        });
      } else {
        dispatch({
          type: FETCH_SCHEMA_SUCCESS,
          payload: data
        });
      }
      return Promise.resolve();
    },
    (error) => {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: FETCH_SCHEMA_ERROR,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
