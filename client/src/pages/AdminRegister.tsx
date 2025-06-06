import { useState, FormEvent, ChangeEvent } from "react";
import logo from "../assets/logo.jpeg";
import axios from "axios";
import { API_ROUTES } from "../utils/apiConfig";

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    collegeName: "",
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formData.password !== confirmPassword) {
      setError("Passwords do not match!");
      setTimeout(() => setError(null), 3000);
      return;
    }
    try {
      const response = await axios.post(API_ROUTES.adminRegister, formData);
      console.log("Admin registered: ", response.data);
      setIsModalOpen(true);
    } catch (error: any) {
      const backendError =
        error.response?.data.errors || error.response?.data.error || "An error occurred.";
      setError(
        Array.isArray(backendError)
          ? backendError.map((err) => err.msg).join(", ")
          : backendError
      );
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const response = await axios.post(API_ROUTES.adminOtpVerify, {
        email: formData.email,
        otp: otp.trim(),
      });
      console.log("OTP Verified: ", response.data);
      setIsModalOpen(false);
      window.location.href = "/admin-login";
    } catch (error: any) {
      setOtpError("Invalid OTP or OTP has expired");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-gray-50 p-4">
          <img src={logo} alt="Logo" className="object-contain" />
        </div>
        <div className="w-full lg:w-1/2 p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-center text-gray-800 underline">
            Admin Registration
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">College Name</label>
              <input
                type="text"
                name="collegeName"
                className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9c231b]"
                value={formData.collegeName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9c231b]"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9c231b]"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {passwordVisible ? (
                  <i
                    className="fa-solid fa-eye absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  ></i>
                ) : (
                  <i
                    className="fa-solid fa-eye-slash absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  ></i>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9c231b]"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-2 text-white bg-[#9c231b] rounded-lg hover:bg-[#502b28] focus:ring-2 focus:ring-[#9c231b]"
            >
              Register
            </button>
          </form>
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          <div className="text-center">
            <span className="text-sm text-gray-600">
              Already have an account?{" "}
            </span>
            <button
              className="text-[#9c231b] hover:underline focus:outline-none"
              onClick={() => (window.location.href = "/admin-login")}
            >
              Login here
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-80">
            <h3 className="text-lg font-semibold mb-4">Enter OTP</h3>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            {otpError && <p className="text-red-500 text-sm text-center">{otpError}</p>}
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#9c231b] text-white rounded-lg hover:bg-[#502b28]"
                onClick={handleOtpSubmit}
              >
                Verify OTP
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRegister;
