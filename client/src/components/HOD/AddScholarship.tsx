import axios from "axios";
import { useEffect, useState } from "react";
import { API_ROUTES } from "../../utils/apiConfig";

interface Form {
  name: string;
  date: string;
  amount: string;
}

function AddScholarship() {
  const [formData, setFormData] = useState<Form>({ name: '', date: '', amount: '' });
  const [activeScholarships, setActiveScholarships] = useState<{ name: string; examDate: string; amount: string }[]>([]);
  const [isFormOpen, setFormOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const openForm = () => setFormOpen(true);
  const closeForm = () => {
    setFormOpen(false);
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = async () => {
    try {
      const response = await axios.post(API_ROUTES.addScholarship, { ...formData });

      if (response.data) {
        setSuccessMessage('Scholarship added successfully!');
        setFormData({ name: '', date: '', amount: '' });
        fetchScholarships();
        setTimeout(() => setSuccessMessage(''), 3000);
        closeForm();
      }
    } catch (error) {
      setErrorMessage('Failed to add scholarship. Please try again.');
    }
  };

  const fetchScholarships = async () => {
    try {
      const response = await axios.get(API_ROUTES.getAllScholarships);
      if (response.data.success) {
        setActiveScholarships(response.data.scholarships);
      }
    } catch (error) {
      console.log('Error fetching scholarships'+error);
    }
  };

  useEffect(() => {
    fetchScholarships();
  }, []);

  return (
    <>
      <div className="p-6">
        <button
          onClick={openForm}
          className="bg-red-600 text-white text-xl rounded-lg px-6 py-3 font-semibold hover:bg-red-700 transition duration-300"
        >
          Add Scholarship
        </button>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Active Scholarships</h2>
          {activeScholarships.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {activeScholarships.map((scholarship, index) => (
                <li
                  key={index}
                  className="border p-4 rounded-lg mb-4 shadow-md hover:shadow-lg transition duration-300 bg-white"
                >
                  <h3 className="text-xl font-bold">{scholarship.name}</h3>
                  <p className="text-sm text-gray-500">Date: {scholarship.examDate.split('T')[0]}</p>
                  <p className="text-sm text-gray-500">Amount: {scholarship.amount}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No scholarships available.</p>
          )}
        </div>

        {isFormOpen && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="w-full max-w-md rounded-lg p-6 bg-white shadow-lg transform transition-all duration-300 scale-100">
              <h2 className="text-2xl font-semibold mb-4">Add Scholarship Details</h2>
              {successMessage && (
                <div className="mb-4 text-green-500 text-lg">{successMessage}</div>
              )}
              {errorMessage && (
                <div className="mb-4 text-red-500 text-lg bg-red-100 p-3 rounded-lg">
                  {errorMessage}
                </div>
              )}
              <form>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-lg font-medium mb-2">Scholarship Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Scholarship Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="date" className="block text-lg font-medium mb-2">Select Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="amount" className="block text-lg font-medium mb-2">Scholarship Amount</label>
                  <input
                    type="text"
                    name="amount"
                    placeholder="Enter Amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    className="bg-gray-300 px-4 py-2 rounded-lg text-gray-800 hover:bg-gray-400 transition duration-300"
                    onClick={closeForm}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="bg-green-500 px-6 py-3 rounded-lg text-white hover:bg-green-600 transition duration-300"
                    onClick={handleAdd}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AddScholarship;
