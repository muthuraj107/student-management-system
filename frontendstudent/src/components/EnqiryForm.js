import React,{ useState } from 'react';
import axios from 'axios'
import '../style/enqiry.css'

const EnqiryForm = () => {
    const [formSubmitted, setFormSubmitted] = useState(false); // New state for form submission status
    const [formData, setFormData] = useState({
      Name: '',
      Age:'',
      Coures_of_interesrt: '',
      Email: '',
      Gender: '',
      Address: '',
      Phone: '',
      Prefered_timing: '',
      Education_status: '',
      Mode: '',
      how_do_you_know: ''
    });
    // Handle form input changes
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
      
  
      // Show success message
    
  
      try {
        const response = await axios.post("http://localhost:4000/api/enqiry/post", formData);
        console.log(response)
        alert("your response add in db")
      } catch (error) {
        console.log(error);
      }
  

      
    };
  return (
    <div className="student-form-container">
    

    {/* Conditionally render the form */}
    
      <form className="student-form" onSubmit={handleSubmit}>
        <h2>Student Inquiry Form</h2>
        <br/>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            name="Age"
            value={formData.Age}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Course of Interest</label>
          <input
            type="text"
            name="Coures_of_interesrt"
            value={formData.Coures_of_interesrt}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="Email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select name="Gender" value={formData.Gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="Address"
            value={formData.Address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            name="Phone"
            value={formData.Phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Preferred Timing</label>
          <select name="Prefered_timing" value={formData.Prefered_timing} onChange={handleChange} required>
            <option value="">Select time</option>
            <option value="Morning">Morning</option>
            <option value="Evening">Evening </option>
          </select>
        </div>

        <div className="form-group">
          <label>Education Status</label>
          <select name="Education_status" value={formData.Education_status} onChange={handleChange} required>
            <option value="">Select Status</option>
            <option value="Undergraduate">Undergraduate</option>
            <option value="Postgraduate">Postgraduate</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Mode of Study</label>
          <select name="Mode" value={formData.Mode} onChange={handleChange} required>
            <option value="">Select Mode</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        <div className="form-group">
          <label>How did you know?</label>
          <input
            type="text"
            name="how_do_you_know"
            value={formData.how_do_you_know}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>


    {/* Show success message after form submission */}
    {formSubmitted && (
      <div className="success-message">
        <h3>Form submitted successfully!</h3>
        <button className="enquiry-button" onClick={() => setFormSubmitted(false)}>
          Enquiry Again
        </button>
      </div>
    )}
  </div>
  )
}

export default EnqiryForm;