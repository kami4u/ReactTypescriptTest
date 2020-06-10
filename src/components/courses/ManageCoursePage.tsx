import React, { Component, ChangeEvent, FormEvent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import { fetchAuthors, fetchCourses, saveNewCourse } from "../../redux/actions";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import Spinner from "../common/Spinner";

import ICourse from "../../@types/ICourse";
import IState from "../../@types/IState";

export const ManageCoursePage = ({ courses, authors, fetchAuthors, fetchCourses, saveNewCourse, history, ...props }) => {
  const [course, setCourse] = useState(props.course);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchAuthors();
    fetchCourses();
  }, []);

  useEffect(() => {
    setCourse(props.course);
  }, [props.course]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value,
    }));
  };

  const formIsValid = () => {
    const { title, authorId, category } = course;
    const errors: any = {};

    if (!title) errors.title = "Title is required.";
    if (!authorId) errors.author = "Author is required.";
    if (!category) errors.category = "Category is required.";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  };

  const handleSave = (event) => {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveNewCourse(course)
      .then(() => {
        toast.success("Course saved.");
        history.push("/courses");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  };

  return (
    <>
      {authors.length === 0 || courses.length === 0 ? (
        <Spinner />
      ) : (
        <CourseForm
          course={course}
          errors={errors}
          authors={authors}
          onSave={handleSave}
          onChange={handleChange}
          saving={saving}
        />
      )}
    </>
  );
};

const getCourseBySlug = (courses: ICourse[], slug) => courses.find((course) => course.slug === slug) || null;

const mapStateToProps = (state: IState, ownProps) => {
  const slug = ownProps.match.params.slug;
  const course = slug && state.courses.length ? getCourseBySlug(state.courses, slug) : newCourse;
  return {
    course,
    courses: state.courses,
    authors: state.authors,
  };
};

export default connect(mapStateToProps, { fetchCourses, fetchAuthors, saveNewCourse })(ManageCoursePage);
