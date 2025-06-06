import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ROUTES } from "../../utils/apiConfig";

const AdmissionForm = () => {
  const navigate = useNavigate();
  interface Document {
    name: string;
    file: File;
  }

  const [formData, setFormData] = useState<{
    fullName: string;
    dob: string;
    gender: string;
    phone: string;
    parentName: string;
    parentPhone: string;
    address: string;
    lastInstitution: string;
    score: string;
    course: string;
    documents: Document[];
  }>({
    fullName: "",
    dob: "",
    gender: "",
    phone: "",
    parentName: "",
    parentPhone: "",
    address: "",
    lastInstitution: "",
    score: "",
    course: "",
    documents: [],
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const files = Array.from(e.target.files || []);

    setFormData((prevData) => ({
      ...prevData,
      documents: [
        ...prevData.documents,
        ...files.map((file) => ({ name, file: file as File })),
      ],
    }));
  };


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        API_ROUTES.admissionForm,
        formData,
        { withCredentials: true }
      );
      console.log("Form submitted successfully:", response.data);
      navigate("/fee-status");
    } catch (error: any) {
      if (error.response) {
        console.error("Error submitting form:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4 text-[#9c231b]">
        Personal Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter your full name"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Date of Birth</label>
          <input
            type="date"
            name="dob"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Gender</label>
          <select
            name="gender"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            onChange={handleChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Contact Number</label>
          <input
            type="text"
            name="phone"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter your contact number"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Parent's Name</label>
          <input
            type="text"
            name="parentName"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter parent's full name"
            pattern="^[a-zA-Z\s]+$"
            title="Please enter a valid name (letters and spaces only)."
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">
            Parent's Contact Number
          </label>
          <input
            type="tel"
            name="parentPhone"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter parent's contact number"
            pattern="^\d{10}$"
            title="Please enter a valid 10-digit contact number."
            required
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block font-medium mb-1">Residential Address</label>
        <textarea
          name="address"
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          rows={2}
          placeholder="Enter your address"
          onChange={handleChange}
        ></textarea>
      </div>

      <h2 className="text-xl font-bold mt-6 mb-4 text-[#9c231b]">
        Academic Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Last Institution</label>
          <input
            type="text"
            name="lastInstitution"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter the name of the institution"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Previous Score (%)</label>
          <input
            type="text"
            name="score"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter your previous score"
            pattern="^(100(\.0{1,})?|[1-9]?[0-9](\.[0-9]{1})?)$"
            title="Enter a valid percentage between 0 and 100 (up to 1 decimal place)."
            required
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block font-medium mb-1">Interested Course</label>
        <div className="flex space-x-4">
          <select
            name="course"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            onChange={handleChange}
          >
            <option value="BSc IT">
              Bachelors of Science in Information Technology{" "}
            </option>
            <option value="BMS">Bachelors of Management Studies</option>
            <option value="BA">Bachelors of Arts</option>
          </select>
        </div>
      </div>

      <h2 className="text-xl font-bold mt-6 mb-4 text-[#9c231b]">
        Document Upload
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block font-medium mb-1">Passport-sized Photo</label>
          <div className="border-dashed border-2 border-gray-300 rounded-lg p-1 text-center">
            <label className="p-1 cursor-pointer">
              <input
                type="file"
                name="passportPhoto"
                accept=".png, .jpg, .jpeg"
                className="hidden"
                onChange={handleFileChange}
              />
              <p>Click to upload a file</p>
              <p className="text-sm text-gray-500">PNG, JPG and JPEG files accepted</p>
            </label>
          </div>
        </div>
        <div>
          <label className="block font-medium mb-1">Academic Marksheet</label>
          <div className="border-dashed border-2 border-gray-300 rounded-lg p-1 text-center">
            <label className="p-1 cursor-pointer">
              <input
                type="file"
                name="academicMarksheet"
                accept=".png, .jpg, .jpeg, .pdf"
                className="hidden"
                onChange={handleFileChange}
              />
              <p>Click to upload a file</p>
              <p className="text-sm text-gray-500">
                PNG, JPG, JPEG, PDF files accepted
              </p>
            </label>
          </div>
        </div>
        <div>
          <label className="block font-medium mb-1">Leaving Certificate</label>
          <div className="border-dashed border-2 border-gray-300 rounded-lg p-1 text-center">
            <label className="p-1 cursor-pointer">
              <input
                type="file"
                name="leavingCertificate"
                accept=".png, .jpg, .jpeg, .pdf"
                className="hidden"
                onChange={handleFileChange}
              />
              <p>Click to upload a file</p>
              <p className="text-sm text-gray-500">
                PNG, JPG, JPEG, PDF files accepted
              </p>
            </label>
          </div>
        </div>
        <div>
          <label className="block font-medium mb-1">Aadhar Card</label>
          <div className="border-dashed border-2 border-gray-300 rounded-lg p-1 text-center">
            <label className="p-1 cursor-pointer">
              <input
                type="file"
                name="aadharCard"
                accept=".png, .jpg, .jpeg, .pdf"
                className="hidden"
                onChange={handleFileChange}
              />
              <p>Click to upload a file</p>
              <p className="text-sm text-gray-500">
                PNG, JPG, JPEG, PDF files accepted
              </p>
            </label>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <label className="flex items-center">
          <input type="checkbox" name="declaration" className="mr-2" />I declare
          that all the information provided is true and correct. I agree to the
          terms and conditions.
        </label>
      </div>

      <button className="mt-6 w-full bg-[#9c231b] text-white py-2 px-4 rounded-lg hover:bg-[#502b28]">
        Submit Application
      </button>
    </form>
  );
};

export default AdmissionForm;
