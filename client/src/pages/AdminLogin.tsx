import axios from "axios";
import { useState, ChangeEvent, FormEvent } from "react";
import logo from "../assets/logo.jpeg";
import { useNavigate } from "react-router-dom";
import { API_ROUTES } from "../utils/apiConfig";

interface FormData {
    email: string;
    password: string;
}

const AdminLogin: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
    });
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                API_ROUTES.adminLogin,
                formData,
                { withCredentials: true }
            );
            console.log("Admin Login:", response.data);
            console.log("Admin Role:", response.data.admin.role);
            
            const role = response.data.admin.role;

            switch (role) {
              case "superAdmin":
                navigate("/super-admin");
                break;
              case "docAdmin":
                navigate("/doc-admin");
                break;
              case "marksAdmin":
                navigate("/marks-admin");
                break;
              case "accountantAdmin":
                navigate("/accountant-admin");
                break;
              case "hod":
                navigate("/admin-grievance");
                break;
              default:
                setError("Invalid role or unauthorized access."); // Handle unexpected roles
                break;
            }
        } catch (error: any) {
            if (error.response && error.response.data) {
                const backendErrors = error.response.data.errors || error.response.data.error;

                if (Array.isArray(backendErrors)) {
                    const formattedErrors = backendErrors.map(err => err.msg).join(", ");
                    setError(formattedErrors);
                } else {
                    setError(backendErrors);
                }
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleRegister(e);
    };

    const handleNavigation = () => {
        navigate("/admin-register");
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
            <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-md">
                {/* Left side with logo */}
                <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-gray-50 p-6">
                    <img src={logo} alt="Logo" className="max-h-80" />
                </div>

                {/* Right side with form */}
                <div className="w-full lg:w-1/2 p-6">
                    <h2 className="text-2xl font-semibold text-center underline text-gray-700 sm:text-3xl">
                        Admin Login
                    </h2>
                    <form onSubmit={handleSubmit} className="mt-6">
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-600"
                            >
                                Username or Email
                            </label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border rounded-lg focus:outline-none focus:ring focus:ring-[#9c231b] sm:text-base"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter Email or Username"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-600"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border rounded-lg focus:outline-none focus:ring focus:ring-[#9c231b] sm:text-base"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter password"
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
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-[#9c231b] rounded-lg hover:bg-[#502b28] focus:outline-none focus:ring focus:ring-blue-300 sm:text-base"
                        >
                            Log In
                        </button>
                        {error && (
                            <p className="text-[#ff2f2f] text-sm mt-4 text-center">{error}</p>
                        )}
                    </form>
                    <div className="mt-4 text-center">
                        <span className="text-sm text-gray-600 sm:text-base">
                            Don't have an account?{" "}
                        </span>
                        <button className="mt-2 text-[#9c241bba] hover:underline focus:outline-none sm:text-base" onClick={handleNavigation}>
                            Register here
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
