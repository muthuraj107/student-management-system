import "./App.css";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AddStaff from "./components/AddStaff";
import StaffDetails from "./components/StaffDetails";
import AddStudent from "./components/AddStudent";
import StudentDetails from "./components/StudentDetails";
import SDashboard from "./components/SDashboard";
import EnqiryData from "./components/EnqiryData";
import Enqiry from "./components/EnqiryForm";
function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/enqiry" element={<Enqiry />} />
          <Route path="/enqiryview" element={<EnqiryData />} />
          <Route path="/Staffdashboard" element={<SDashboard />} />
          <Route path="/staff/add" element={<AddStaff />} />
          <Route path="/staff/details" element={<StaffDetails />} />
          <Route path="/students/add" element={<AddStudent />} />
          <Route path="/students/details" element={<StudentDetails />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
