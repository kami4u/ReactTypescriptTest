import React, { Component, ChangeEvent, FormEvent } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { fetchAuthors, fetchCourses, deleteCourseOptimistic } from "../../redux/actions";
import Spinner from "../common/Spinner";
import CourseList from "./CourseList";
import ICourse from "../../@types/ICourse";
import IState from "../../@types/IState";
import { toast } from "react-toastify";

interface IProps {
  fetchCourses: () => {};
  fetchAuthors: () => {};
  deleteCourseOptimistic: (any) => Promise<any>;
  courses: ICourse[];
  loading: boolean;
}

class CoursePage extends Component<IProps, {}> {
  state = {
    redirectToAddCoursePage: false,
  };
  componentDidMount() {
    const { fetchAuthors, fetchCourses } = this.props;
    fetchCourses();
    fetchAuthors();
  }

  handleDeleteCourse = (course) => {
    const { deleteCourseOptimistic } = this.props;
    toast.success("Course Deleted");
    deleteCourseOptimistic(course).catch((error) => {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    });
  };

  render() {
    const { courses, loading } = this.props;
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Course
            </button>
            <CourseList courses={courses} onDeleteClick={this.handleDeleteCourse} />
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (state: IState /*ownProps*/) => {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => ({
            ...course,
            authorName: state.authors.find((a) => a.id === course.authorId)?.name,
          })),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0,
  };
};

// const mapDispatchToProps = { fetchCourses, fetchAuthors };

export default connect(mapStateToProps, { fetchCourses, fetchAuthors, deleteCourseOptimistic })(CoursePage);
