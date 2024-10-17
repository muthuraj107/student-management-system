import React, {  useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";

const Header = () => {
  const role = localStorage.getItem("role");
  const navigate=useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/",);
  };
  return (
    <div className="header">
      <h1>{role && role} Dashboard</h1>
      <nav className="nav">
        <Link to={role && role === "Admin" ? `/dashboard` : `/Staffdashboard`}>
          Dashboard
        </Link>

        {/* Staff Dropdown */}
        {role && role === "Admin" && (
          <div className="dropdown">
            <span>Staff</span>
            <div className="dropdown-content">
              <Link to={role && role === "Admin" && `/staff/add`}>
                Add New Staff
              </Link>
              <Link to={role && role === "Admin" && `/staff/details`}>
                Staff Details
              </Link>
            </div>
          </div>
        )}
        {role && role === "Admin" && (
          <div className="">
            <Link to="/course">Course</Link>
          </div>
        )}
        {/* Students Dropdown */}
        <div className="dropdown dropdown-2">
          <span>Students</span>
          <div className="dropdown-content">
            <Link to={role && `/students/add`}>Add Student</Link>
            <Link to={role && `/students/details`}>Student Details</Link>
            <Link to={`/enqiryview`}>Enquiry</Link>
          </div>
        </div>

        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Header;
