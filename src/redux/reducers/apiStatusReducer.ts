import initialState from "./initialState";

export default function apiStatusReducer(apiCallsInProgress = initialState.apiCallsInProgress, action) {
  if (action.type === "BEGIN_API_CALL") {
    return apiCallsInProgress + 1;
  } else if (action.type === "API_CALL_SUCCESS" || action.type === "API_CALL_ERROR") {
    return apiCallsInProgress - 1;
  }

  return apiCallsInProgress;
}
