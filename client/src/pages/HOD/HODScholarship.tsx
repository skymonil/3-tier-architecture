import { Routes, Route, NavLink } from 'react-router-dom'
import HOD_Navbar from '../../components/HOD/HOD_Navbar'
import AddScholarship from '../../components/HOD/AddScholarship'
import ApproveScholarship from '../../components/HOD/ApproveScholarship'
import Navbar from "../MarksAdmin/Navbar";

function HODScholarship() {
  return (
    <>
      <Navbar />
      <HOD_Navbar />
      <div className='max-w-5xl p-5 shadow-xl min-h-96 m-auto'>
        <div className='text-3xl font-semibold'>
          Scholarship Management
        </div>
        <div className='flex justify-evenly py-4 text-xl'>
          <NavLink to="/admin-scholarship/add" className={({ isActive }) => `${isActive ? 'text-[#9c231b] border-b border-[#9c231b] py-2' : ''}`}>
            <div>
              Scholarships
            </div>
          </NavLink>
          <NavLink to="/admin-scholarship/approve-students" className={({ isActive }) => `${isActive ? 'text-[#9c231b] border-b border-[#9c231b] py-2' : ''}`}>
            <div>
              Approve Students
            </div>
          </NavLink>
        </div>
        <Routes>
          <Route path="add" element={<AddScholarship />} />
          <Route path="approve-students" element={<ApproveScholarship />} />
        </Routes>
      </div>
    </>
  )
}

export default HODScholarship
