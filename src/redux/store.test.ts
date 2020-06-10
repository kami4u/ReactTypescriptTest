import { createStore } from "redux";
import rootReducer from "./reducers";
import initialState from "./reducers/initialState";

it("Should handle creating courses", () => {
  // arrange
  const store = createStore(rootReducer, initialState);
  const course = { title: "Clean Code" };

  // act
  store.dispatch({ type: "CREATE_COURSE_SUCCESS", payload: course });

  // assert
  const createdCourse = store.getState().courses[0];
  expect(createdCourse).toEqual(course);
});
