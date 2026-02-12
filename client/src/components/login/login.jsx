import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Importing navigate
import { NavLink } from "react-router-dom";     // For guest login
import "./login.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();  // Hook to navigate after login

  async function onSubmit(e) {
    e.preventDefault();

    const newPerson = {
      email: form.email,
      password: form.password,
    };

    try {
      const response = await fetch("http://localhost:5000/login", {  // Correct URL and Port
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPerson),
      });

      if (!response.ok) {
        const errorData = await response.json();
        window.alert(errorData.message);
        return;
      }

      const data = await response.json();
      const { token } = data;  // Extract the token from response
      localStorage.setItem("token", token);  // Store the token for further requests

      // Redirect to homepage after successful login
      navigate("/home");

      // Clear form after submission
      setForm({ email: "", password: "" });
    } catch (error) {
      window.alert("An error occurred during login.");
      console.error("Login Error: ", error);
    }
  }

  return (
    <div className="loginContainer">
      <div className="loginPage"> 
        <form id="loginForm" onSubmit={onSubmit}>  
          <div className="container">
            <label htmlFor="email"><b>Email</b></label>
            <input 
              id="email" 
              type="email" 
              placeholder="Enter Email" 
              name="email" 
              value={form.email}  
              onChange={(e) => setForm({ ...form, email: e.target.value })}  
              required 
            />
            <br />
            <label htmlFor="password"><b>Password</b></label>
            <input 
              id="password" 
              type="password" 
              placeholder="Enter password" 
              name="password" 
              value={form.password}  
              onChange={(e) => setForm({ ...form, password: e.target.value })}  
              required 
            />
            <br />
            <button id="submit" type="submit">Login</button>
          </div>
        </form>
        <br />
        <div>
          <NavLink to="/" className="nav-link">
            <button id="guest">Continue as guest</button>
          </NavLink>
        </div>
        <div>
          <NavLink to="/signup" className="nav-link">
            <button id="signup">Signup Now!</button>
          </NavLink>
        </div>
      </div>
      </div>
  );
}
