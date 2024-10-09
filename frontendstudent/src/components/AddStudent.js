import React, { useState,useEffect } from "react";
import axios from "axios";
import "./StudentForm.css";
import { useNavigate } from "react-router-dom";
const StudentForm = () => {
  const navigate = useNavigate();
  const [courses,setCourses]=useState([])
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    passOutYear: "",
    sslcMark: "",
    hscMark: "",
    address: "",
    degree: "",
    phone: "",
    courseName: "",
    email: "",

    gender: "",
    courseStartDate: "",
    courseEndDate: "",
    preferredTime: "",
    courseFees: "",
    currentPayment: "",
    referredBy: "",
    counseledBy: "",
    mode: "",
  });
  
  
  const role = localStorage.getItem("role");

useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/course/data");
        setCourses(response.data); // Assuming the response data is an array of course objects
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // If courseName is changed, update couresFees
    if (name === "courseName") {
      const selectedCourse = courses.find((course) => course.courseName === value);
      setFormData((prevData) => ({
        ...prevData,
        courseFees: selectedCourse ? selectedCourse.courseFees : "",
      }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/std/post", formData);
      alert("Your response has been added to the database");
      navigate(role === "Admin" ? `/dashboard` : `/Staffdashboard`);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Student Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />

        <label htmlFor="passOutYear">Pass Out Year:</label>
        <input
          type="number"
          id="passOutYear"
          name="passOutYear"
          value={formData.passOutYear}
          onChange={handleChange}
          required
        />

        <label htmlFor="sslcMark">SSLC Mark:</label>
        <input
          type="number"
          id="sslcMark"
          name="sslcMark"
          value={formData.sslcMark}
          onChange={handleChange}
          required
        />

        <label htmlFor="hscMark">HSC Mark:</label>
        <input
          type="number"
          id="hscMark"
          name="hscMark"
          value={formData.hscMark}
          onChange={handleChange}
          required
        />

        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <label htmlFor="degree">Degree:</label>
        <input
          type="text"
          id="degree"
          name="degree"
          value={formData.degree}
          onChange={handleChange}
          required
        />

        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label htmlFor="courseName">Course Name:</label>
        <select
          id="courseName"
          name="courseName"
          value={formData.courseName}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          {courses.map((course) => (
            <option key={course.id} value={course.courseName}>
              {course.courseName}
            </option>
          ))}
        </select>

        <label htmlFor="couresFees">Course Fees:</label>
        <input
          type="text"
          id="couresFees"
          name="couresFees"
          value={formData.courseFees}
          readOnly
        />

        <label htmlFor="courseStartDate">Course Start Date:</label>
        <input
          type="date"
          id="courseStartDate"
          name="courseStartDate"
          value={formData.courseStartDate}
          onChange={handleChange}
          required
        />

        <label htmlFor="courseEndDate">Course End Date:</label>
        <input
          type="date"
          id="courseEndDate"
          name="courseEndDate"
          value={formData.courseEndDate}
          onChange={handleChange}
          required
        />

        <label htmlFor="currentPayment"> currentPayment:</label>
        <input
          type="currentPayment"
          id="currentPayment"
          name="currentPayment"
          value={formData.currentPayment}
          onChange={handleChange}
          required
        />
        <label htmlFor="preferredTime">Preferred Time:</label>
        <input
          type="text"
          id="preferredTime"
          name="preferredTime"
          value={formData.preferredTime}
          onChange={handleChange}
          required
        />

        <label htmlFor="referredBy">Referred By:</label>
        <input
          type="text"
          id="referredBy"
          name="referredBy"
          value={formData.referredBy}
          onChange={handleChange}
        />

        <label htmlFor="counseledBy">Counseled By:</label>
        <input
          type="text"
          id="counseledBy"
          name="counseledBy"
          value={formData.counseledBy}
          onChange={handleChange}
        />

        <label htmlFor="mode">Mode:</label>
        <select
          id="mode"
          name="mode"
          value={formData.mode}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
          <option value="Hybrid">Hybrid</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default StudentForm;
