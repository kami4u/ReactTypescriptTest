import IState from "../../@types/IState";
import ICourse from "../../@types/ICourse";
import initialState from "./initialState";

const courseReducers = (courses: any[] = initialState.courses, action: { type: string; payload?: any }): ICourse[] => {
  switch (action.type) {
    case "GET_COURSES":
      return action.payload;
    case "CREATE_COURSE_SUCCESS":
      return [...courses, { ...action.payload }];
    case "UPDATE_COURSE":
      return courses.map((course) => (course.id === action.payload.id ? action.payload : course));
    case "DELETE_COURSE":
      return courses.filter((course) => course.id !== action.payload.id);
    default:
      return courses;
  }
};

export default courseReducers;
