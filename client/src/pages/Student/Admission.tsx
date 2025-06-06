import { Route, Routes } from "react-router-dom";
import AdmissionTabs from "../../components/student-admission/AdmissionTabs";
import Navbar from "./Navbar";
import AdmissionForm from "../../components/student-admission/AdmissionForm";
import Courses from "../../components/student-admission/Courses";
import AdmissionGuidelines from "../../components/student-admission/AdmissionGuidelines";
import AdmissionHelp from "../../components/student-admission/AdmissionHelp";

const Admission = () => {
  return (
    <div>
      <Navbar />
      <div className="p-4 bg-gray-50 min-h-screen">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-8">
          {/* Tabs */}
          <AdmissionTabs />
          {/* Routes */}
          <Routes>
            <Route path="form" element={<AdmissionForm />} />
            <Route path="guidelines" element={<AdmissionGuidelines />} />
            <Route path="courses" element={<Courses />} />
            <Route path="help" element={<AdmissionHelp />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admission;
