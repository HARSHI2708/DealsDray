import React, { useState, useEffect } from 'react';
import "../Styles/CreateUserForm.css";


const CreateUserForm = ({ addUser, selectedUser, updateUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [designation, setDesignation] = useState('HR');
  const [gender, setGender] = useState('M');
  const [courses, setCourses] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (selectedUser) {
      // Populate form fields when editing a user
      setName(selectedUser.name);
      setEmail(selectedUser.email);
      setMobile(selectedUser.mobile);
      setDesignation(selectedUser.designation);
      setGender(selectedUser.gender);
      setCourses(selectedUser.courses);
      // Note: Assuming 'file' is not editable, so not updating it here
    }
  }, [selectedUser]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleCourseChange = (e) => {
    const value = e.target.value;
    setCourses((prevCourses) => {
      if (prevCourses.includes(value)) {
        // If the course is already in the array, remove it
        return prevCourses.filter((course) => course !== value);
      } else {
        // If the course is not in the array, add it
        return [...prevCourses, value];
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted!'); 
    // Validate and handle form submission
    // Here, you would typically send the data to the server or update your state.
    // For simplicity, I'll just create a new user object and call the addUser function.
    const newUser = {
      id: selectedUser ? selectedUser.id : Math.random().toString(36).substring(7),
      name,
      email,
      mobile,
      designation,
      gender,
      courses,
      file,
    };

    if (selectedUser) {
      updateUser(newUser);
    } else {
      addUser(newUser);
    }

     // Save form data to local storage
     const storedData = JSON.parse(localStorage.getItem('formData')) || [];
     const updatedData = [...storedData, newUser];
     localStorage.setItem('formData', JSON.stringify(updatedData));

    // Clear form fields after submission
    setName('');
    setEmail('');
    setMobile('');
    setDesignation('HR');
    setGender('M');
    setCourses([]);
    setFile(null);
  };

  return (
    <div className="create-user-form-container">
      <h2>Create Employee</h2>
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

      <label>Mobile:</label>
      <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} required />

      <label>Designation:</label>
      <select value={designation} onChange={(e) => setDesignation(e.target.value)}>
        <option value="HR">HR</option>
        <option value="Manager">Manager</option>
        <option value="Sales">Sales</option>
      </select>

      <label>Gender:</label>
      <label>
        <input type="radio" value="M" checked={gender === 'M'} onChange={() => setGender('M')} />
        Male
      </label>
      <label>
        <input type="radio" value="F" checked={gender === 'F'} onChange={() => setGender('F')} />
        Female
      </label>

      <label>Courses:</label>
      <label>
        <input type="checkbox" value="MCA" checked={courses.includes('MCA')} onChange={handleCourseChange} />
        MCA
      </label>
      <label>
        <input type="checkbox" value="BCA" checked={courses.includes('BCA')} onChange={handleCourseChange} />
        BCA
      </label>
      <label>
        <input type="checkbox" value="BSC" checked={courses.includes('BSC')} onChange={handleCourseChange} />
        BSC
      </label>

      <label>File Upload (jpg/png only):</label>
      <input type="file" accept=".jpg, .png" onChange={handleFileChange} />

      <button type="submit">{selectedUser ? 'Update' : 'Submit'}</button>
    </form>
    </div>
  );
};

export default CreateUserForm;
