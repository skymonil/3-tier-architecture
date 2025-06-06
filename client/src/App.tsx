import {
  BrowserRouter as Router,
  Routes,
  Route,
  //useLocation,
//  matchPath,
} from "react-router-dom";
import Register from "./pages/Register";
import LogIn from "./pages/LogIn";
import AdminRegister from "./pages/AdminRegister";
import AdminLogin from "./pages/AdminLogin";

 // import Navbar from "./components/Navbar";
import Dashboard from "./pages/Student/Dashboard";
import Admission from "./pages/Student/Admission";
import FeeStatus from "./pages/Student/FeeStatus";
import ReExam from "./pages/Student/ReExam";
import Result from "./pages/Student/Result";
import Scholarship from "./pages/Student/Scholarship";
import Grievance from "./pages/Student/Grievance";
import Leave from "./pages/Student/Leave";
import WalletPage from "./pages/Student/WalletPage";

import SuperAdmin from "./pages/SuperAdmin/page";
import MarksAdmin from "./pages/MarksAdmin/page";
import DocumentVerificationAdmin from "./pages/DocAdmin/DocumentVerificationAdmin";
import AddMoney from "./pages/AccountantAdmin/AddMoney";
import GrievanceList from "./pages/HOD/GrievanceList";
import LeaveApproval from "./pages/HOD/LeaveApproval";
import HODScholarship from "./pages/HOD/HODScholarship";
import TeacherDashboard from "./pages/Teacher/TeacherDashboard";

import NotFound from "./pages/NotFound";
import { StudentProvider } from "./context/StudentContext";
import StudentMark from "./pages/Teacher/StudentMark";
import Practicals from "./pages/Student/Practicals";

const AppContent = () => {
  // const location = useLocation();
 /* const hideNavbarPaths = [
    "/leave",
    "/fee-status",
    "/student-detail",
    "/wallet",
    "/grievance",
    "/admission/*",
    "/reexam",
    "scholarship",
    "/result",
    "/practicals"
  ]; // List of paths where the navbar should appear
*/
 /* const shouldHaveNavbar = hideNavbarPaths.some((path) =>
    matchPath({ path, end: true }, location.pathname)
  );  */


  return (
    <>
      <StudentProvider>
        {/* {shouldHaveNavbar && <Navbar />} */}
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/log-in" element={<LogIn />} />

          <Route path="/admin-register" element={<AdminRegister />} />
          <Route path="/admin-login" element={<AdminLogin />} />

          <Route path="/student-detail" element={<Dashboard />} />
          <Route path="/admission/*" element={<Admission />} />
          <Route path="/fee-status" element={<FeeStatus />} />
          <Route path="/practicals" element={<Practicals />} />
          <Route path="/reexam" element={<ReExam />} />
          <Route path="/result" element={<Result />} />
          <Route path="/scholarship" element={<Scholarship />} />
          <Route path="/grievance" element={<Grievance />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/wallet" element={<WalletPage />} />

          <Route path="/super-admin" element={<SuperAdmin />} />
          <Route path="/doc-admin" element={<DocumentVerificationAdmin />} />
          <Route path="/marks-admin" element={<MarksAdmin />} />
          <Route path="/accountant-admin" element={<AddMoney />} />

          <Route path="/admin-grievance" element={<GrievanceList />} />
          <Route path="/admin-leave" element={<LeaveApproval />} />
          <Route path="/admin-scholarship/*" element={<HODScholarship />} />

          <Route path='/teacher/mark' element = {<StudentMark/>}/>
          <Route path="/teacher/approve" element={<TeacherDashboard />}/>

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </StudentProvider>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

