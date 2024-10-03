import React, { useState } from "react";
import "../style/login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [activeTab, setActiveTab] = useState("admin");
  const [staffEmail, setStaffEmail] = useState();
  const [staffPassword, setStaffPassword] = useState();
  const [adminEmail, setAdminEmail] = useState();
  const [adminPassword, setAdminPassword] = useState();
  const showLogin = (type) => {
    setActiveTab(type);
    if (type === "admin") {
      document.body.style.backgroundColor = " white";
    } else if (type === "staff") {
      document.body.style.backgroundColor = " white";
    }
  };

  const navigate = useNavigate();
  const defaultAdminEmail = "admin@gmail.com";
  const defaultAdminPassword = "admin";

  // Function to navigate to another page

  //admin login
  const adminLogin = () => {
    if (
      adminEmail &&
      defaultAdminEmail === adminEmail &&
      defaultAdminPassword === adminPassword
    ) {
      localStorage.removeItem("role");

      localStorage.setItem("role", "Admin");

      navigate(`/dashboard`);
    } else {
      alert("Invalid email or password");
    }
  };

  //staff login
  const staffLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/staff/login",
        {
          email: staffEmail,
          password: staffPassword,
        }
      );
      if (response.data.success) {
        localStorage.removeItem("role");

        localStorage.setItem("role", "Staff");
        navigate("/Staffdashboard");
      } else {
        window.alert("Invalid email or password");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="header">
        <h1>Login</h1>
      </div>
      <div className="container1">
        <div className="login-box">
          <div className="tabs">
            <div
              id="admin-tab"
              className={activeTab === "admin" ? "active" : ""}
              onClick={() => showLogin("admin")}
            >
              Admin
            </div>
            <div
              id="staff-tab"
              className={activeTab === "staff" ? "active" : ""}
              onClick={() => showLogin("staff")}
            >
              Staff
            </div>
          </div>
          {activeTab === "admin" && (
            <div id="admin-login">
              <div className="form-group1">
                <label htmlFor="admin-email">Email</label>
                <input
                  type="email"
                  id="admin-email"
                  name="admin-email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                />
              </div>
              <div className="form-group1">
                <label htmlFor="admin-password">Password</label>
                <input
                  type="password"
                  id="admin-password"
                  name="admin-password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                />
              </div>
              <button className="login-button" onClick={() => adminLogin()}>
                Login
              </button>
            </div>
          )}
          {activeTab === "staff" && (
            <div id="staff-login">
              <div className="form-group1">
                <label htmlFor="staff-email">Email</label>
                <input
                  type="email"
                  id="staff-email"
                  name="staff-email"
                  value={staffEmail}
                  onChange={(e) => setStaffEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group1">
                <label htmlFor="staff-password">Password</label>
                <input
                  type="password"
                  id="staff-password"
                  name="staff-password"
                  value={staffPassword}
                  onChange={(e) => setStaffPassword(e.target.value)}
                  required
                />
              </div>
              <button className="login-button" onClick={() => staffLogin()}>
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
