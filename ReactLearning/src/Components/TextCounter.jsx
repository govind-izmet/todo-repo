import { useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TextCounter() {
  const [name, setName] = useState(""); // State for name input
  const [password, setPassword] = useState(""); // State for password input
  const [nameError, setNameError] = useState(""); // State for name validation error
  const [passwordError, setPasswordError] = useState(""); // State for password validation error
  const [submittedData, setSubmittedData] = useState(null); // Track submitted data

  const navigate = useNavigate();

  // Handler for name input change with validation
  function onChangeNameHandler(e) {
    const inputValue = e.target.value;
    if (inputValue.length > 0 && inputValue.charAt(0) === inputValue.charAt(0).toUpperCase()) {
      setName(inputValue);
      setNameError(""); // Clear any previous error
    } else {
      setName("");
      setNameError("First letter of the username should be uppercase.");
    }
  }

  // Handler for password input change with validation
  function onChangePasswordHandler(e) {
    const inputValue = e.target.value;
    if (inputValue.length < 8) {
      setPassword("");
      setPasswordError("Password must be more than 8 characters.");
    } else {
      setPassword(inputValue);
      setPasswordError(""); // Clear any previous error
    }
  }

  // Form submission handler
  function onSubmitHandler(e) {
    e.preventDefault(); // Prevent form from reloading the page
    if (name && password) {
      // Set the submitted data to show below the form
      setSubmittedData({ name, password });

      // Optionally navigate to another route
      // navigate('/data', { state: { pass: password, name: name } });
    } else {
      if (!name) setNameError("Please provide a valid username.");
      if (!password) setPasswordError("Please provide a valid password.");
    }
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center">User Form</h2>
      <form className="row g-3" onSubmit={onSubmitHandler}>
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">Username</label>
          <input
            type="text"
            placeholder="Username"
            id="name"
            onChange={(e) => onChangeNameHandler(e)}
            className={`form-control ${nameError ? "is-invalid" : ""}`}
          />
          {nameError && <div className="invalid-feedback">{nameError}</div>}
        </div>

        <div className="col-md-6">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            onChange={(e) => onChangePasswordHandler(e)}
            className={`form-control ${passwordError ? "is-invalid" : ""}`}
          />
          {passwordError && <div className="invalid-feedback">{passwordError}</div>}
        </div>

        <div className="col-auto">
          <button type="submit" className="btn btn-primary mb-3">Display Initials</button>
        </div>
      </form>

      {/* Display submitted data below the form */}
      {submittedData && (
        <div className="mt-4">
          <h4>Submitted Data:</h4>
          <p><strong>Username:</strong> {submittedData.name}</p>
          <p><strong>Password:</strong> {submittedData.password}</p>
        </div>
      )}
    </div>
  );
}