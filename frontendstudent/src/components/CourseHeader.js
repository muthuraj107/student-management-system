import React from "react";
import { Link, useNavigate } from "react-router-dom";
import '../style/Course1.css'; // Ensure you are importing the correct CSS

const CourseHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="course-header">
      <nav className="course-nav">
        {/* Course Link */}
        <Link to="/course">Course</Link>
      </nav>


    </div>
  );
};

export default CourseHeader;
