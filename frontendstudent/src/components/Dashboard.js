import React, { useEffect, useState } from "react";
import { FaUsers, FaUserGraduate, FaRupeeSign, FaSearch } from "react-icons/fa";
import Header from "./Header";
import axios from "axios";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);

  const handleSearch = async () => {
    const filteredData = data.filter((item) => {
      return item.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredData(filteredData);
  };

  const getData = async () => {
    try {
      const user = await axios.get("http://localhost:4000/api/staff/data");
      setData(user.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="dashboard">
      <Header />
      <Stats />
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
      <StaffTable data={filteredData.length > 0 ? filteredData : data} />
    </div>
  );
};

const Stats = () => {
const [data, setData] = useState();
   const [dataStd, setDataStd] = useState();
  
   const getData = async () => {
     try {
       const user = await axios.get("http://localhost:4000/api/staff/data");
       const userStudent = await axios.get(
         "http://localhost:4000/api/std/data"
       );
       console.log(user.data);
       console.log(user.headers);
       console.log(user.config);
       console.log(user.request);
       setData(user.data);
       setDataStd(userStudent.data)
     } catch (error) {
       console.log(error);
     }
   };
   useEffect(() => {
     getData();
   }, []);
  return (
    <div className="stats">
      <div className="stat">
        <FaUsers size={36} />
        <h3>Staff Total Count</h3>
        <p>{data?.length||10}</p>
      </div>
      <div className="stat">
        <FaUserGraduate size={36} />
        <h3>Student Total Count</h3>
        <p>{dataStd?.length||50}</p>
      </div>
      <div className="stat">
        <FaRupeeSign size={36} />
        <h3>Amount Collected</h3>
        <p>$5000</p>
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
        {data &&
          data.map((item, index) => (
            <tr>
              <td> {index + 1} </td>
              <td> {item.staffId} </td>
              <td> {item.name} </td>
              <td>{item.email}</td>
              <td>**********</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Dashboard;
