import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../style/login.css";
import axios from "axios";

const Login = () => {
  const [activeTab, setActiveTab] = useState("admin");
  const [staffEmail, setStaffEmail] = useState("");
  const [staffPassword, setStaffPassword] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const showLogin = (type) => {
    setActiveTab(type);
    document.body.style.backgroundColor = "white";
  };

  // Clear role if on the root path
  if (location.pathname === "/") {
    localStorage.removeItem("role");
  }

  const defaultAdminEmail = "admin@gmail.com";
  const defaultAdminPassword = "admin";

  const handleLogin = async () => {
    if (activeTab === "admin") {
      if (adminEmail === "" || adminPassword === "") {
        alert("Please fill in all the fields.");
        return;
      }

      if (
        adminEmail !== defaultAdminEmail ||
        adminPassword !== defaultAdminPassword
      ) {
        alert("Incorrect admin email or password.");
        return;
      }

      localStorage.removeItem("role");
      localStorage.setItem("role", "Admin");
      navigate("/dashboard", {replace:true});
    } else {
      if (staffEmail === "" || staffPassword === "") {
        alert("Please fill in all the fields.");
        return;
      }

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

          // Pass the staffEmail as state to the next page
          navigate("/Staffdashboard", { state: { email: staffEmail } });
        } else {
          alert("Incorrect staff email or password.");
        }
      } catch (error) {
        console.error(error);
        alert("An error occurred while logging in.");
      }
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
              <button className="login-button" onClick={handleLogin}>
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
              <button className="login-button" onClick={handleLogin}>
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
