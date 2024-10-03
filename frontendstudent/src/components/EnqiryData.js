import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EnqiryData = () => {

  const [data, setData] = useState();
  const getData = async () => {
    try {
      const user = await axios.get('http://localhost:4000/api/enqiry/data');
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

//   const removeData=async (id)=>{
//     const remove = await axios.delete(`http://localhost:4000/api/staff/delete/${id}`);
//     console.log(remove);
//     setData((prevData)=>prevData.filter((item)=>item._id !== id))
// }
  return (
    
    <div>
     
      <h2>Enqiry View</h2>
      <table>
      <thead>
        <tr>
          <th>S.No</th>
          <th>Name</th>
          <th>Coures_of_interesrt</th>
          <th>Email</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Phone</th>
          <th>Prefered_timing</th>
          <th>Education_status</th>
          <th>Mode</th>
          <th>how_do_you_know</th>
          
        </tr>
      </thead>
      <tbody>
      {data &&
            data.map((item, index) => (
              <tr>
                {/* {" "} */}
                <td> {index +1} </td>
                <td> {item.Name} </td>
                <td> {item.Coures_of_interesrt} </td>
                <td> {item.Email} </td>
                <td> {item.Age} </td>
                <td> {item.Gender}</td>
                <td> {item.Phone} </td>
                <td> {item.Prefered_timing} </td>
                <td> {item.Education_status} </td>
                <td> {item.Mode} </td>
                <td> {item.how_do_you_know} </td>
                <td className="actions">
              {/* <button onClick={()=>{removeData(item._id)}}>Delete</button> */}
            </td>
              </tr>
            ))}
      </tbody>
    </table>
    </div>
  )
}

export default EnqiryData;