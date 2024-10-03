// Dashboard.js
import React ,{useEffect,useState}from 'react';
import { FaUsers, FaUserGraduate, FaRupeeSign, FaSearch } from 'react-icons/fa';
import Header from './Header'
import axios from 'axios';

const Dashboard = () => {
  return (
    
    <div className="dashboard">
      <Header/>
      <Stats />
      <SearchBar />
      <StaffTable />
    </div>
  );
};

const Stats = () => {
  return (
    <div className="stats">
      <div className="stat">
        <FaUsers size={36} />
        <h3>Staff Total Count</h3>
        <p>50</p>
      </div>
      <div className="stat">
        <FaUserGraduate size={36} />
        <h3>Student Total Count</h3>
        <p>200</p>
      </div>
      <div className="stat">
        <FaRupeeSign size={36} />
        <h3>Amount Collected</h3>
        <p>$5000</p>
      </div>
    </div>
  );
};

const SearchBar = () => {
  return (
    <div className="search-bar admin-search-bar">
      <input type="text" placeholder="Enter Staff Name" />
      <button>
        <FaSearch /> Search
      </button>
    </div>
  );
};

const StaffTable = () => {
  const [data, setData] = useState();
  const getData = async () => {
    try {
      const user = await axios.get('http://localhost:4000/api/staff/data');
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
                {/* {" "} */}
                <td> {index +1} </td>
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
