import React, { useEffect, useState } from "react";
import { FaUsers, FaUserGraduate, FaRupeeSign, FaSearch } from "react-icons/fa";
import Header from "./Header";
import axios from "axios";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);
  const [student, setStudent] = useState([]);

  // Function to handle the search logic
  const handleSearch = () => {
    const filteredData = data?.filter((item) => {
      return item.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredData(filteredData);
  };

  // Function to fetch staff and student data
  const getData = async () => {
    try {
      const staffResponse = await axios.get(
        "http://localhost:4000/api/staff/data"
      );
      const studentResponse = await axios.get(
        "http://localhost:4000/api/std/data"
      );

      setData(staffResponse.data || []);
      setStudent(studentResponse.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // Effect to fetch data on component mount
  useEffect(() => {
    getData();
  }, []);

  // Call handleSearch whenever searchQuery changes
  useEffect(() => {
    handleSearch();
  }, [searchQuery, data]); // Add 'data' to dependencies to ensure filteredData updates correctly

  return (
    <div className="dashboard">
      <Header />
      <Stats data={data} student={student} />
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch} // Pass handleSearch as a prop
      />
      <StaffTable data={filteredData.length > 0 ? filteredData : data} />
    </div>
  );
};

const Stats = ({ data, student }) => {
  const filterAmount = student
    ?.map((item) => item.paidAmount)
    ?.reduce((sum, num) => sum + num, 0); // Provide initial value

  return (
    <div className="stats">
      <div className="stat">
        <FaUsers size={36} />
        <h3>Staff Total Count</h3>
        <p>{data?.length || 10}</p>
      </div>
      <div className="stat">
        <FaUserGraduate size={36} />
        <h3>Student Total Count</h3>
        <p>{student?.length || 50}</p>
      </div>
      <div className="stat">
        <FaRupeeSign size={36} />
        <h3>Amount Collected</h3>
        <p>&#8377;{filterAmount || 400000}</p>
      </div>
    </div>
  );
};

const SearchBar = ({ searchQuery, setSearchQuery, handleSearch }) => {
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="search-bar admin-search-bar">
      <input
        type="text"
        placeholder="Enter Staff Name"
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>
        <FaSearch /> Search
      </button>
    </div>
  );
};

const StaffTable = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>S.No</th>
          <th>Staff ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Password</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item, index) => (
          <tr key={item.staffId}>
            {" "}
            {/* Added key prop */}
            <td>{index + 1}</td>
            <td>{item.staffId}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>**********</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Dashboard;
