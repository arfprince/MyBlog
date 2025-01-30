import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export default function Login() {
    const navigate = useNavigate(); 
    const [password, setpassword] = useState("");
    const [email, setEmail] = useState("");
    const {isLoggedIn, setIsLoggedIn} = useAuth();
    const handleLogin = (e) => {
      e.preventDefault();
      
      let users = JSON.parse(localStorage.getItem("users")) || {};
      if (!users[email] || users[email].password !== password) {
        alert("Invalid username or password or Create a new account");
        return;
      }
      else if(users[email].password===password && users[email].email===email){
        localStorage.setItem("currentSessionUser", JSON.stringify(email));
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", true);
        return navigate('/');
      }
    };
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              autoCapitalize='email'
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              autoCapitalize='new-password'
              onChange={(e) => setpassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-center mt-2">Don't have an account? <Link to="/register" className="text-blue-500">Register</Link></p>
      </div>
    );
  }