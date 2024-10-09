// StudentDetails.js
import React, { useEffect, useState } from 'react';
import '../style/stdcard.css'
import { IoPersonCircle } from "react-icons/io5";
import Header from './Header'
import axios from 'axios';

const StudentDetails = () => {
  const [data, setData] = useState();
  const [studentDetails, setStudentDetails] = useState();

  // State to manage popup visibility and edit mode
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // New state for edit mode
  const [updateid, setupdateid] = useState();

  const [filter, setFilter] = useState("all");
  const getData = async () => {
    try {
      const user = await axios.get("http://localhost:4000/api/std/data");

      setData(user.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData()
  }, [updateid]);

  // popup

  // Function to toggle popup visibility
  const togglePopup = (student) => {
    setupdateid(student._id);
    setStudentDetails(student);
    setIsPopupOpen(!isPopupOpen);
    setIsEditMode(false); // Reset edit mode when popup is closed
  };

  // Function to toggle edit mode
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  //
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setStudentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  //
  const updateData = async () => {
     await axios.put(
      `http://localhost:4000/api/std/put/${updateid}`,
      studentDetails
    );
    setData((prevData) =>
      prevData?.map((user) =>
        user._id === updateid ? { ...user, ...studentDetails } : user
      )
    );
  };
  // Function to determine course status
  const getCourseStatus = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const current = new Date();
    return current >= start && current <= end ? "Ongoing" : "Passout";
  };

  // Function to filter students based on status
  const filteredData = data?.filter((student) => {
    const status = getCourseStatus(
      student.courseStartDate,
      student.courseEndDate
    );
    if (filter === "all") return true;
    return status.toLowerCase() === filter;
  });
  return (
    <div>
      <Header />
      <h2>Student Details</h2>

      {/* Filter Options */}
      <div className="filter-options">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("ongoing")}>Ongoing</button>
        <button onClick={() => setFilter("passout")}>Passout</button>
      </div>

      <div className="cardmain">
        {filteredData?.map((student, index) => (
          <div className="card" key={index}>
            <div className="icon">
              <IoPersonCircle size={60} className="i" />
            </div>
            <div className="info">
              <p className="name">{student.name}</p>
              <p className="email">{student.email}</p>
              <p className="stack">{student.courseName}</p>

              {/* Display the course status */}
              <p
                className={`status ${getCourseStatus(
                  student.courseStartDate,
                  student.courseEndDate
                ).toLowerCase()}`}
              >
                {getCourseStatus(
                  student.courseStartDate,
                  student.courseEndDate
                )}
              </p>

              <a
                href="#"
                className="details-link"
                onClick={() => togglePopup(student)}
              >
                View Details
              </a>
            </div>
          </div>
        ))}
      </div>

      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>{isEditMode ? "Edit Student Details" : ""}</h2>

            <div className="details-box">
              <h3>Personal Details</h3>
              <ul>
                <li>
                  <label>Std_ID: </label>
                  <input
                    type="text"
                    name="stdId"
                    value={studentDetails.stdId}
                    onChange={handleInputChange}
                    readOnly
                  />
                </li>
                <li>
                  <label>Name: </label>
                  <input
                    type="text"
                    name="name"
                    value={studentDetails.name}
                    onChange={handleInputChange}
                    readOnly={!isEditMode}
                  />
                </li>
                <li>
                  <label>Age: </label>
                  <input
                    type="text"
                    name="age"
                    value={studentDetails.age}
                    onChange={handleInputChange}
                    readOnly={!isEditMode}
                  />
                </li>
                <li>
                  <label>Address: </label>
                  <textarea
                    name="address"
                    value={studentDetails.address}
                    onChange={handleInputChange}
                    readOnly={!isEditMode}
                  />
                </li>
                <li>
                  <label>Phone: </label>
                  <input
                    type="text"
                    name="phone"
                    value={studentDetails.phone}
                    onChange={handleInputChange}
                    readOnly={!isEditMode}
                  />
                </li>
                <li>
                  <label>Gender: </label>
                  <input
                    type="text"
                    name="gender"
                    value={studentDetails.gender}
                    onChange={handleInputChange}
                    readOnly={!isEditMode}
                  />
                </li>
                <li>
                  <label>Email: </label>
                  <input
                    type="text"
                    name="email"
                    value={studentDetails.email}
                    onChange={handleInputChange}
                    readOnly={!isEditMode}
                  />
                </li>
              </ul>
            </div>

            <div className="details-box">
              <h3>Education Details</h3>
              <ul>
                <li>
                  <label>Pass Out Year: </label>
                  <input
                    type="text"
                    name="passOutYear"
                    value={studentDetails.passOutYear}
                    onChange={handleInputChange}
                    readOnly={!isEditMode}
                  />
                </li>
                <li>
                  <label>SSLC Mark: </label>
                  <input
                    type="text"
                    name="sslcMark"
                    value={studentDetails.sslcMark}
                    onChange={handleInputChange}
                    readOnly={!isEditMode}
                  />
                </li>
                <li>
                  <label>HSC Mark: </label>
                  <input
                    type="text"
                    name="hscMark"
                    value={studentDetails.hscMark}
                    onChange={handleInputChange}
                    readOnly={!isEditMode}
                  />
                </li>
                <li>
                  <label>Degree: </label>
                  <input
                    type="text"
                    name="degree"
                    value={studentDetails.degree}
                    onChange={handleInputChange}
                    readOnly={!isEditMode}
                  />
                </li>
              </ul>
            </div>

            <div className="details-box">
              <h3>Course Details</h3>
              <ul>
                <li>
                  <label>Course Name: </label>
                  <input
                    type="text"
                    name="courseName"
                    value={studentDetails.courseName}
                    onChange={handleInputChange}
                    readOnly={!isEditMode}
                  />
                </li>
                <li>
                  <label>Course Start Date: </label>
                  <input
                    type="text"
                    name="courseStartDate"
                    value={studentDetails.courseStartDate}
                    onChange={handleInputChange}
                    readOnly={!isEditMode}
                  />
                </li>
                <li>
                  <label>Course End Date: </label>
                  <input
                    type="text"
                    name="courseEndDate"
                    value={studentDetails.courseEndDate}
                    onChange={handleInputChange}
                    readOnly={!isEditMode}
                  />
                </li>
                <li>
                  <label>Preferred Time: </label>
                  <input
                    type="text"
                    name="preferredTime"
                    value={studentDetails.preferredTime}
                    onChange={handleInputChange}
                    readOnly={!isEditMode}
                  />
                </li>
                <li>
                  <label>Referred By: </label>
                  <input
                    type="text"
                    name="referredBy"
                    value={studentDetails.referredBy}
                    onChange={handleInputChange}
                    readOnly={!isEditMode}
                  />
                </li>
                <li>
                  <label>Counseled By: </label>
                  <input
                    type="text"
                    name="counseledBy"
                    value={studentDetails.counseledBy}
                    onChange={handleInputChange}
                    readOnly={!isEditMode}
                  />
                </li>
                <li>
                  <label>Mode: </label>
                  <input
                    type="text"
                    name="mode"
                    value={studentDetails.mode}
                    onChange={handleInputChange}
                    readOnly={!isEditMode}
                  />
                </li>
              </ul>
            </div>
            <div className="details-box">
              <h3>Frees Details</h3>
              <ul>
                <li>
                  <label>Course Name: </label>
                  <input
                    type="text"
                    name="courseName"
                    value={studentDetails.courseName}
                    onChange={handleInputChange}
                    readOnly={!isEditMode}
                  />
                </li>
                <li>
                  <label>Total Frees: </label>
                  <input
                    type="text"
                    name="couresFees"
                    value={studentDetails.courseFees}
                    onChange={handleInputChange}
                    readOnly={!isEditMode}
                  />
                </li>
                <li>
                  <label>Paid Amount: </label>
                  <input
                    type="text"
                    name="paid"
                    value={studentDetails.paidAmount}
                    onChange={handleInputChange}
                    readOnly={!isEditMode}
                  />
                </li>
                <li>
                  <label>Pending amount: </label>
                  <input
                    type="text"
                    name="pending"
                    value={studentDetails.pendingAmount}
                    onChange={handleInputChange}
                    readOnly={!isEditMode}
                  />
                </li>
                <li>
                  <label>Payment amount: </label>
                  <input
                    type="text"
                    name="currentPayment"
                    value={studentDetails.currentPayment}
                    onChange={handleInputChange}
                    readOnly={!isEditMode}
                  />
                </li>
              </ul>
            </div>

            <div className="button-group">
              <button onClick={togglePopup}>Close</button>
              <button
                onClick={() => {
                  if (isEditMode) {
                    updateData();
                  }
                  toggleEditMode();
                }}
              >
                {isEditMode ? "Save" : "Edit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDetails;
