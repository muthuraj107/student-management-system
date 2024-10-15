import React, { useState, useEffect } from "react";
import CourseHeader from "./CourseHeader";
import "../style/Course1.css";
import axios from "axios";

const CoursePage = () => {
  const [courseName, setCourseName] = useState("");
  const [courseFees, setCourseFees] = useState("");
  const [courses, setCourses] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleCourseNameChange = (e) => setCourseName(e.target.value);
  const handleCourseFeesChange = (e) => setCourseFees(e.target.value);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/course/data");
      setCourses(response.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editIndex !== null) {
        // Update course on the server
        await axios.put(
          `http://localhost:4000/api/course/put/${courses[editIndex]._id}`,
          {
            courseName,
            courseFees,
          }
        );
      } else {
        // Add new course to the server
        await axios.post("http://localhost:4000/api/course/post", {
          courseName,
          courseFees,
        });
      }
      setCourseName("");
      setCourseFees("");
      setEditIndex(null);
      getData(); // Refresh data
    } catch (error) {
      console.log("Error submitting form:", error);
    }
  };

  const handleEdit = (index) => {
    setCourseName(courses[index].courseName);
    setCourseFees(courses[index].courseFees);
    setEditIndex(index);
  };

  const handleDelete = async (courseId) => {
    try {
      await axios.delete(
        `http://localhost:4000/api/course/delete/${courseId}`
      );
      getData(); // Refresh data
    } catch (error) {
      console.log("Error deleting course:", error);
    }
  };

  return (
    <div>
      <CourseHeader />
      <div className="course-form-wrapper">
        <form onSubmit={handleSubmit} className="course-page-form">
          <input
            type="text"
            placeholder="Course Name"
            value={courseName}
            onChange={handleCourseNameChange}
            required
          />
          <input
            type="number"
            placeholder="Course Fees"
            value={courseFees}
            onChange={handleCourseFeesChange}
            required
          />
          <button type="submit">
            {editIndex !== null ? "Update" : "Add"} Course
          </button>
        </form>
      </div>

      <table className="course-page-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Course Name</th>
            <th>Course Fees</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={course._id}>
              <td>{index + 1}</td>
              <td>{course.courseName}</td>
              <td>{course.courseFees}</td>
              <td>
                <button
                  onClick={() => handleEdit(index)}
                  className="course-page-action-button"
                >
                  Edit
                </button>
                &nbsp; &nbsp;
                <button
                  onClick={() => handleDelete(course._id)}
                  className="course-page-action-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoursePage;
