import { getCourses, saveCourse, deleteCourse } from "../../api/courseApi";
import { beginApiCall, apiCallSuccess, apiCallError } from "./apiStatusAction";

// export function loadCourseSuccess(courses) {
//   return { type: types.LOAD_COURSES_SUCCESS, courses };
// }

// export function createCourseSuccess(course) {
//   return { type: types.CREATE_COURSE_SUCCESS, course };
// }

// export function updateCourseSuccess(course) {
//   return { type: types.UPDATE_COURSE_SUCCESS, course };
// }

// export function deleteCourseOptimistic(course) {
//   return { type: types.DELETE_COURSE_OPTIMISTIC, course };
// }

export const fetchCourses = () => async (dispatch) => {
  dispatch(beginApiCall());
  try {
    const courses = await getCourses();
    dispatch({ type: "GET_COURSES", payload: courses });
    dispatch(apiCallSuccess());
  } catch (error) {
    dispatch(apiCallError());
    throw error;
  }
};

export const saveNewCourse = (course) => async (dispatch) => {
  dispatch(beginApiCall());
  try {
    const savedCourse = await saveCourse(course);
    dispatch({ type: "UPDATE_COURSE", payload: savedCourse });
    dispatch(apiCallSuccess());
  } catch (error) {
    dispatch(apiCallError());
    throw error;
  }
};

export const deleteCourseOptimistic = (course) => async (dispatch) => {
  dispatch({ type: "DELETE_COURSE", payload: course });
  return deleteCourse(course.id);
};
