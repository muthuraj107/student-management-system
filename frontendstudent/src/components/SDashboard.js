import React ,{useEffect,useState}from 'react';
import {  FaUserGraduate } from 'react-icons/fa';
import Header from './Header'
import axios from 'axios';
import './SDashboard.css'

const SDashboard = () => {
  const [data, setData] = useState();
  const getData = async () => {
    try {
      const user = await axios.get('http://localhost:4000/api/std/data');
      console.log(user.data);
      console.log(user.headers);
      console.log(user.config);
      console.log(user.request);
      setData(user.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  
  return (
    <div>
      <Header />
      <div className="flex-container">
        <div className="card">
          <FaUserGraduate size={36} />

          <div>Student Total Count</div>
          <div>200</div>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <input type="text" placeholder="Enter Student Name" />
          <button>Search</button>
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
          {data &&
            data.map((item, index) => (
              <tr>
                {/* {" "} */}
                <td> {index + 1} </td>
                <td> {item.std_Id} </td>
                <td> {item.name} </td>
                <td>{item.email}</td>
                <td>{item.age}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default SDashboard