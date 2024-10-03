import React, { useState } from 'react';
import axios from 'axios'
import './StudentForm.css';

const StudentForm = () => {
  const [formData, setFormData] = useState({
    
    name: '',
    age: '',
    passOutYear: '',
    sslcMark: '',
    hscMark: '',
    address: '',
    degree: '',
    phone: '',
    courseName: '',
    email: '',
    gender: '',
    courseStartDate: '',
    courseEndDate: '',
    preferredTime: '',
    referredBy: '',
    counseledBy: '',
    mode: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();   //The e.preventDefault() method is called to prevent the default behavior of the form submission, which is to reload the page. 
    try {
      const response = await axios.post("http://localhost:4000/api/std/post", formData);
  
      alert("your response add in db")
    } catch (error) {
      console.log(error);
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

        <label htmlFor="courseName">Course Name:</label>
        <input
          type="text"
          id="courseName"
          name="courseName"
          value={formData.courseName}
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
