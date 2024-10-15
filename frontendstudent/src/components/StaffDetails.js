// StaffDetails.js
import React, { useEffect, useState } from 'react';

import Header from './Header'
import axios from 'axios';




const StaffDetails = () => {
  const [data, setData] = useState();
  const getData = async () => {
    try {
      const user = await axios.get('http://localhost:4000/api/staff/data');

      setData(user.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const removeData=async (id)=>{
    const remove = await axios.delete(`http://localhost:4000/api/staff/delete/${id}`);
    console.log(remove);
    setData((prevData)=>prevData.filter((item)=>item._id !== id))
}


  return (
    <div>
      <Header />
      <br />
      <br />
      <h2>Staff Details</h2>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Staff ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => (
              <tr>
                {/* {" "} */}
                <td> {index + 1} </td>
                <td> {item.staffId} </td>
                <td> {item.name} </td>
                <td>{item.email}</td>
                <td>**********</td>
                <td className="actions">
                  <button
                    onClick={() => {
                      removeData(item._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffDetails;
