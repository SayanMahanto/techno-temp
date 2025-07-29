import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const registerModalRef = useRef();
  const navigate = useNavigate();

  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [whatsappNo, setWhatsappNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [studentIdValid, setStudentIdValid] = useState(false);
  const [studentIdMessage, setStudentIdMessage] = useState("");
  const [studentIdValidating, setStudentIdValidating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if (
        registerModalRef.current &&
        !registerModalRef.current.contains(e.target)
      ) {
        navigate(-1);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [navigate]);

  useEffect(() => {
    const validateStudentId = async () => {
      const id = studentId.trim();
      if (id.length < 1) {
        setStudentIdMessage("");
        setStudentIdValid(false);
        return;
      }

      setStudentIdValidating(true);

      try {
        const response = await axios.post(
          "http://localhost:8000/validate_student_id",
          { college_id: id }
        );

        if (response.status === 200 && response.data.status === "valid") {
          setStudentIdMessage("Student ID is valid!");
          setStudentIdValid(true);
        }
      } catch (error) {
        const errorMsg =
          error.response?.data?.detail ||
          "Student ID hasn't matched or already registered";
        setStudentIdMessage(errorMsg);
        setStudentIdValid(false);
      } finally {
        setStudentIdValidating(false);
      }
    };

    const debounceTimer = setTimeout(validateStudentId, 500);
    return () => clearTimeout(debounceTimer);
  }, [studentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!studentIdValid) {
      setErrorMessage("Please enter a valid Student ID!");
      return;
    }

    if (!name.trim()) {
      setErrorMessage("Full Name is required!");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long!");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/User_register",
        {
          college_id: studentId.trim(),
          name: name.trim(),
          email: email.trim(),
          password: password,
          phone_no: contactNo,
          whatsapp_no: whatsappNo,
        }
      );

      if (response.status >= 200 && response.status < 300) {
        navigate(response.data.redirect || "/login");
      }
    } catch (error) {
      console.error("Registration error:", error);
      const errorMsg = error.response?.data?.detail || "Registration failed";
      setErrorMessage("Error: " + errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1a102e] flex items-center justify-center px-4">
      <div
        ref={registerModalRef}
        className="w-full max-w-4xl bg-black/80 backdrop-blur-md rounded-xl shadow-lg flex overflow-hidden border-2 border-purple-600"
      >
        {/* Logo Section */}
        <div className="w-1/2 hidden md:flex items-center justify-center bg-black">
          <div className="p-6">
            <img
              src="images/login-bg1.png"
              alt="Logo"
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 text-white">
          <h2 className="text-2xl font-semibold mb-1">Create an Account</h2>
          <p className="text-sm mb-6 text-gray-400">
            Already have an account?{" "}
            <a href="/login" className="text-purple-400 underline">
              Log in
            </a>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full px-4 py-2 rounded bg-[#2b2b2b] border border-gray-600 text-white text-sm"
              required
            />
            {studentIdValidating && (
              <p className="text-blue-400 text-sm">Validating...</p>
            )}
            {studentIdMessage && (
              <p
                className={`text-sm font-bold ${
                  studentIdValid ? "text-green-400" : "text-red-500"
                }`}
              >
                {studentIdMessage}
              </p>
            )}

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded bg-[#2b2b2b] border border-gray-600 text-white text-sm"
              disabled={!studentIdValid}
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded bg-[#2b2b2b] border border-gray-600 text-white text-sm"
              disabled={!studentIdValid}
              required
            />

            <input
              type="tel"
              placeholder="Contact No"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value.replace(/\D/g, ""))}
              className="w-full px-4 py-2 rounded bg-[#2b2b2b] border border-gray-600 text-white text-sm"
              disabled={!studentIdValid}
              maxLength={10}
              required
            />

            <input
              type="tel"
              placeholder="WhatsApp No"
              value={whatsappNo}
              onChange={(e) =>
                setWhatsappNo(e.target.value.replace(/\D/g, ""))
              }
              className="w-full px-4 py-2 rounded bg-[#2b2b2b] border border-gray-600 text-white text-sm"
              disabled={!studentIdValid}
              maxLength={10}
              required
            />
            <p className="text-xs text-gray-400">
              (If same as contact, fill same number in both)
            </p>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded bg-[#2b2b2b] border border-gray-600 text-white text-sm"
              disabled={!studentIdValid}
              required
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 rounded bg-[#2b2b2b] border border-gray-600 text-white text-sm"
              disabled={!studentIdValid}
              required
            />

            <div className="flex items-start gap-2">
              <input type="checkbox" required />
              <span className="text-xs">
                I agree to the{" "}
                <a href="#" className="text-purple-400 underline">
                  Terms & Conditions
                </a>
              </span>
            </div>

            {errorMessage && (
              <p className="text-sm text-red-500 font-medium">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
              disabled={!studentIdValid || loading}
            >
              {loading ? "Creating..." : "Create account"}
            </button>

            <div className="flex items-center justify-center gap-2 mt-4">
              <span className="text-sm text-gray-400">or register with</span>
            </div>

            <div className="flex gap-4">
              <button className="w-1/2 border border-white py-2 rounded flex items-center justify-center gap-2 hover:bg-white hover:text-black transition">
                <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
                Google
              </button>
              <button className="w-1/2 border border-white py-2 rounded flex items-center justify-center gap-2 hover:bg-white hover:text-black transition">
                <img src="/apple-icon.svg" alt="Apple" className="w-5 h-5" />
                Apple
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
