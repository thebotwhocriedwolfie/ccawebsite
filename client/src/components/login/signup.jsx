import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./login.css";

export default function Signup() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate(); // Hook to navigate after signup

  async function onSubmit(e) {
    e.preventDefault();

    const newUser = {
      email: form.email,
      password: form.password,
    };

    try {
      const response = await fetch("http://localhost:5000/register", { // Corrected to register route
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        const errorData = await response.json();
        window.alert(errorData.message);
        return;
      }

      window.alert("Signup successful! Please log in."); // Show success message
      navigate("/login"); // Redirect to login page

      // Clear form after successful signup
      setForm({ email: "", password: "" });
    } catch (error) {
      window.alert("An error occurred during signup.");
      console.error("Signup Error: ", error);
    }
  }

  return (
    <div className="loginContainer">
      <div className="loginPage"> 
        <form id="signupForm" onSubmit={onSubmit}>  
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
            <button id="submit" type="submit">Signup</button>
          </div>
        </form>
        <br />
        <div>
          <NavLink to="/" className="nav-link">
            <button id="guest">Continue as guest</button>
          </NavLink>
        </div>
        <div>
          <NavLink to="/login" className="nav-link">
            <button id="login">Login</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
