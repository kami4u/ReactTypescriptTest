import courseReducer from "./courseReducers";
import * as actions from "../actions/courseActions";

it("Should add course when passed create course success", () => {
  const initialState = [
    { id: 1, title: "A" },
    { id: 2, title: "B" },
  ];

  const newCourse = { title: "C", id: 3 };

  const action = { type: "CREATE_COURSE_SUCCESS", payload: newCourse };
  const newState = courseReducer(initialState, action);

  expect(newState.length).toEqual(3);
  expect(newState[0].title).toEqual("A");
  expect(newState[1].title).toEqual("B");
  expect(newState[2].title).toEqual("C");
});

it("Should update course when passed UPDATE_COURSE", () => {
  const initialState = [
    { id: 1, title: "A" },
    { id: 2, title: "B" },
  ];

  const newCourse = { title: "C", id: 2 };

  const action = { type: "UPDATE_COURSE", payload: newCourse };
  const newState = courseReducer(initialState, action);

  expect(newState.length).toEqual(2);
  expect(newState[0].title).toEqual("A");
  expect(newState[1].title).toEqual("C");
  expect(newState[1].id).toEqual(2);
});
