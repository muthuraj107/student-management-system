import React, { useState } from 'react';
import './StaffForm.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


const StaffForm = () => {
  const [formData, setFormData] = useState({
       
    name: "",
    email: "",
    password:""
  });

const navigate=useNavigate()
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();   //The e.preventDefault() method is called to prevent the default behavior of the form submission, which is to reload the page. 
    try {
       await axios.post("http://localhost:4000/api/staff/post", formData);
  
      alert("your response add in db")
    navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
return (
<div className="form-container">
  <h2>Staff Registration Form</h2>
    <form onSubmit={handleSubmit}>
    <label> Name: </label>
    <input   type="text" name="name"   value={formData.name} onChange={handleInput}/>
    <br />
    <label> Email: </label>
    <input   type="text" name="email"   value={formData.email} onChange={handleInput}/>
    <br />
    <label> password: </label>
    <input   type="text" name="password"   value={formData.password} onChange={handleInput}/>
    <br />
    <button type="submit">Submit</button>
  </form>
</div>
)
}


export default StaffForm;
