import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const role = localStorage.getItem("role");

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
        {/* Students Dropdown */}
        <div className="dropdown dropdown-2">
          <span>Students</span>
          <div className="dropdown-content">
            <Link to={role && `/students/add`}>Add Student</Link>
            <Link to={role && `/students/details`}>Student Details</Link>
            <Link to={`/enqiryview`}>Enquiry</Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
