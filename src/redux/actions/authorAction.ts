import { getAuthors } from "../../api/authorApi";
import { beginApiCall, apiCallSuccess, apiCallError } from "./apiStatusAction";

export const fetchAuthors = () => async (dispatch) => {
  dispatch(beginApiCall());
  try {
    const authors = await getAuthors();
    dispatch({ type: "GET_AUTHORS", payload: authors });
    dispatch(apiCallSuccess());
  } catch (error) {
    dispatch(apiCallError());
    throw error;
  }
};
