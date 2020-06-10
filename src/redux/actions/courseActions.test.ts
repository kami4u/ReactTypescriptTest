import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import * as courseActions from "./courseActions";
import { courses } from "../../../tools/mockData";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("Async Actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("should load courses and dispatch success action", () => {
    fetchMock.mock("*", { body: courses, headers: { "content-type": "application/json" } });

    const expectedActions = [{ type: "BEGIN_API_CALL" }, { type: "GET_COURSES", payload: courses }, { type: "API_CALL_SUCCESS" }];

    const store = mockStore({ courses: [] });
    return store.dispatch(courseActions.fetchCourses()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
