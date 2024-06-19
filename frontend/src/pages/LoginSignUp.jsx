import React, { useState } from 'react';
import './CSS/LoginSignUp.css';

const LoginSignUp = () => {
  const [method, setMethod] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMethodChange = (newMethod) => {
    setMethod(newMethod);
  };

  const login = async () => {
    let responseData;
    await fetch('https://shopease-g13m.onrender.com/login', {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then((res) => res.json())
    .then((data) => responseData = data);

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    } 
    else {
      alert("Login failed: " + responseData.error);
    }
  };

  const signup = async () => {
    let responseData;
    await fetch('https://shopease-g13m.onrender.com/signup', {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then((res) => res.json())
    .then((data) => responseData = data);

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    } 
    else {
      alert("Signup failed: " + responseData.error);
    }
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{method}</h1>
        <div className="loginsignup-fields">
          {method === "Sign Up" && (
            <input
              type="text"
              name="username"
              placeholder='Username'
              value={formData.username}
              onChange={changeHandler}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder='Email Address'
            value={formData.email}
            onChange={changeHandler}
            required
          />
          <input
            type="password"
            name="password"
            placeholder='Password'
            value={formData.password}
            onChange={changeHandler}
            required
          />
        </div>
        <button onClick={() => { method === "Login" ? login() : signup() }}>
          Continue
        </button>
        {method === "Login" ? (
          <p className='loginsignup-login'>
            Don't have an account? <span onClick={() => handleMethodChange("Sign Up")}>Sign Up</span>
          </p>
        ) : (
          <p className='loginsignup-login'>
            Already have an account? <span onClick={() => handleMethodChange("Login")}>Login</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginSignUp;
