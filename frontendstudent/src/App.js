import "./App.css";
import Login from "./components/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AddStaff from "./components/AddStaff";
import StaffDetails from "./components/StaffDetails";
import AddStudent from "./components/AddStudent";
import StudentDetails from "./components/StudentDetails";
import SDashboard from "./components/SDashboard";
import EnqiryData from "./components/EnqiryData";
import Enqiry from "./components/EnqiryForm";
import CoursePage from './components/CoursePage'
const ProtectedRoute = () => {
  const role = localStorage.getItem("role");
  if (!role || (role !== "Admin" && role !== "Staff")) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};
const ProtectedRouteAdmin = ({ component: Component, ...rest }) => {
  const role = localStorage.getItem("role");
  if (role !== "Admin") {
    return <Navigate to="/" />;
  }
  return <Component {...rest} />;
};
function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/enqiry" element={<Enqiry />} />
          <Route path="/enqiryview" element={<EnqiryData />} />
          <Route element={<ProtectedRoute />}>
            <Route
              path="/dashboard"
              element={<ProtectedRouteAdmin component={Dashboard} />}
            />
            <Route path="/Staffdashboard" element={<SDashboard />} />
            <Route
              path="/staff/add"
              element={<ProtectedRouteAdmin component={AddStaff} />}
            />
            <Route
              path="/staff/details"
              element={<ProtectedRouteAdmin component={StaffDetails} />}
            />
            <Route path="/students/add" element={<AddStudent />} />
            <Route path="/students/details" element={<StudentDetails />} />
            <Route
              path="/course"
              element={<ProtectedRouteAdmin component={CoursePage} />}
            />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}
export default App;
