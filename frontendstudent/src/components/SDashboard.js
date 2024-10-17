import React, { useEffect, useState } from "react";
import { FaUserGraduate } from "react-icons/fa";
import Header from "./Header";
import axios from "axios";
import "./SDashboard.css";
import { useLocation } from "react-router-dom";
const Staffdashboard = () => {
  const [data, setData] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const staffEmail = location.state?.email || "No email provided";

  const getData = async () => {
    try {
      const user = await axios.get("http://localhost:4000/api/std/data");
      setData(user.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const handleSearch = async () => {
    const filteredData = data.filter((item) => {
      return item.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredData(filteredData);
  };
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  return (
    <div>
      <Header />
      <h1>Welcome, {staffEmail}!</h1>
      <div className="flex-container">
        <div className="card">
          <FaUserGraduate size={36} />

          <div>Student Total Count</div>
          <div>{data?.length || 10}</div>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter Student Name"
            value={searchQuery}
            onChange={handleInputChange}
          />
          <button onClick={() => handleSearch()}>Search</button>
        </div>
      </div>
      {/* Table Section */}
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Student ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>age</th>
          </tr>
        </thead>
        <tbody>
          {filteredData?.length > 0
            ? filteredData.map((item, index) => (
                <tr>
                  {/* {" "} */}
                  <td> {index + 1} </td>
                  <td> {item.stdId} </td>
                  <td> {item.name} </td>
                  <td>{item.email}</td>
                  <td>{item.age}</td>
                </tr>
              ))
            : data &&
              data?.map((item, index) => (
                <tr>
                  {/* {" "} */}
                  <td> {index + 1} </td>
                  <td> {item.stdId} </td>
                  <td> {item.name} </td>
                  <td>{item.email}</td>
                  <td>{item.age}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default Staffdashboard;
