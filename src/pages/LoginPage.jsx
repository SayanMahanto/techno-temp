import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("Logging in with", formData);
      // Implement login logic here (axios POST etc.)
      navigate("/dashboard"); // Redirect on successful login
    } catch (error) {
      console.error("Login error", error);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url('/images/login-bg.png')`, // make sure this image exists
      }}
    >
      <div className="bg-black/80 p-10 rounded-xl w-[90%] sm:w-[400px] shadow-lg border border-purple-600">
        <h2 className="text-white text-3xl font-bold mb-6 text-center">Sign In</h2>
        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="px-4 py-2 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="px-4 py-2 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white py-2 rounded-lg transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="my-4 flex items-center justify-between text-gray-400">
          <hr className="flex-grow border-gray-600" />
          <span className="px-2">or sign in with</span>
          <hr className="flex-grow border-gray-600" />
        </div>

        {/* Social Login */}
        <div className="flex justify-center space-x-4">
          <button className="p-2 bg-white rounded-full hover:scale-105 transition">
            <FcGoogle size={24} />
          </button>
          <button className="p-2 bg-white rounded-full hover:scale-105 transition">
            <FaGithub size={24} />
          </button>
          <button className="p-2 bg-white rounded-full hover:scale-105 transition">
            <FaLinkedin size={24} color="#0077b5" />
          </button>
        </div>

        {/* Sign Up Redirect */}
        <p className="text-center text-sm text-gray-300 mt-6">
          Don’t have an account?
          <span
            className="text-purple-400 cursor-pointer hover:underline ml-1"
            onClick={() => navigate("/register")}
          >
            Sign up here
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
