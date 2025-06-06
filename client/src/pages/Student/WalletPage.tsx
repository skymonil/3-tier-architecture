import Navbar from "./Navbar";
import React, { useState } from "react";
// import logo from "../../assets/logo.jpeg";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export { };

function WalletPage(): React.ReactElement {
  const [isPendingExpOpen, setPendingExpOpen] = useState<boolean>(true);
  const [selectedTask, setSelectedTask] = useState<null | { date: string; amount: string; particulars: string }>(null);
  const [walletBalance, setWalletBalance] = useState<number>(5000);
  const [pendingTasks, setPendingTasks] = useState<{ date: string; amount: string; particulars: string }[]>([
    { date: "01/01/2025", amount: "1200", particulars: "Journal Fees" },
    { date: "02/01/2025", amount: "1500", particulars: "Ledger Fees" },
    { date: "03/01/2025", amount: "5000", particulars: "Tuition Fees" },
    { date: "04/01/2025", amount: "700", particulars: "Library Fees" },
    { date: "05/01/2025", amount: "2500", particulars: "Exam Fees" },
  ]);

  const [completedTasks, setCompletedTasks] = useState<{ date: string; amount: string; particulars: string; status: boolean }[]>([
    { date: "24/12/2024", amount: "62500", particulars: "Fees", status: true },
  ]);

  // const [amount, setAmount] = useState<number>(5000); // Example initial wallet balance

  // const handleAddFunds = () => {
  //   const options = {
  //     key: "rzp_test_1Hx7smB3aOIDYu", // Your Razorpay key
  //     amount: amount * 100, // Amount in paisa (1 INR = 100 paisa)
  //     currency: "INR",
  //     name: "CAAM",
  //     description: "Add funds to your wallet",
  //     image: logo, 
  //     handler: function (response: any) {
  //       // Handle payment success
  //       alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);

  //       // Verify payment on the server side
  //       verifyPaymentOnServer(response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature);
  //     },
  //     prefill: {
  //       name: "Student Name", // Optional: Prefill user details
  //       email: "student@example.com", // Optional
  //       contact: "1234567890", // Optional
  //     },
  //     notes: {
  //       address: "Your address", // Optional: Address or other notes
  //     },
  //     theme: {
  //       color: "#F37254", // Customize button color
  //     },
  //   };

  //   const rzp1 = new window.Razorpay(options);
  //   rzp1.open();
  // };


  // const verifyPaymentOnServer = async (razorpay_payment_id, razorpay_order_id, razorpay_signature) => {
  //   try {
  //     const response = await axios.post("http://localhost:5000/api/razopay/verify-payment", {
  //       razorpay_payment_id,
  //       razorpay_order_id,
  //       razorpay_signature,
  //     });

  //     if (response.status === 200) {
  //       alert("Payment Verified Successfully");
  //     } else {
  //       alert("Payment Verification Failed");
  //     }
  //   } catch (error) {
  //     console.error("Error during payment verification", error);
  //     alert("An error occurred while verifying the payment");
  //   }
  // };


  const handlePay = (task: { date: string; amount: string; particulars: string }) => {
    const amount = parseFloat(task.amount);
    if (walletBalance >= amount) {
      setWalletBalance(walletBalance - amount);
      setCompletedTasks([...completedTasks, { ...task, status: true }]);
    } else {
      setCompletedTasks([...completedTasks, { ...task, status: false }]);
    }
    setPendingTasks(pendingTasks.filter((t) => t !== task));
    setSelectedTask(null); // Close the modal after processing payment
    setPendingExpOpen(false); // Switch to Payment History view
  };

  return (
    <div>
      <Navbar />
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6 text-4xl font-bold text-red-600">Your Wallet</div>

          <div className="flex flex-col lg:flex-row items-center justify-between bg-red-100 p-5 rounded-lg shadow-lg">
            <div className="flex items-center text-3xl gap-3">
              <i className="fas fa-wallet text-red-600"></i>
              <span className="text-gray-800">Current Balance:</span>
              <span className="font-semibold text-red-600">
                <i className="fas fa-indian-rupee-sign mr-1"></i>{walletBalance.toLocaleString()}
              </span>
            </div>

            <button
              // onClick={handleAddFunds} 
              className="bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 shadow-md transition-all duration-300">
              <i className="fas fa-plus mr-2"></i>Add Funds
            </button>
          </div>

          <div className="flex justify-center gap-10 text-lg font-semibold mt-8">
            <div
              className={`cursor-pointer py-2 px-6 rounded-lg transition-all duration-300 ${isPendingExpOpen ? "bg-red-600 text-white" : "bg-gray-200 hover:bg-red-600 hover:text-white"}`}
              onClick={() => setPendingExpOpen(true)}
            >
              Pending Expenses
            </div>
            <div
              className={`cursor-pointer py-2 px-6 rounded-lg transition-all duration-300 ${!isPendingExpOpen ? "bg-green-600 text-white" : "bg-gray-200 hover:bg-green-600 hover:text-white"}`}
              onClick={() => setPendingExpOpen(false)}
            >
              Payment History
            </div>
          </div>

          <div className="mt-8">
            {isPendingExpOpen ? (
              pendingTasks.length > 0 ? (
                <table className="min-w-full bg-white shadow-md rounded-lg border-separate border-spacing-0">
                  <thead className="bg-gray-200 text-gray-600">
                    <tr>
                      <th className="py-3 px-6 text-left">Date</th>
                      <th className="py-3 px-6 text-left">Amount</th>
                      <th className="py-3 px-6 text-left">Particulars</th>
                      <th className="py-3 px-6 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingTasks.map((task, index) => (
                      <tr
                        key={index}
                        className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                      >
                        <td className="py-4 px-6">{task.date}</td>
                        <td className="py-4 px-6">{task.amount}</td>
                        <td className="py-4 px-6">{task.particulars}</td>
                        <td className="py-4 px-6">
                          <button
                            className="bg-green-500 hover:bg-green-600 px-4 py-2 text-white rounded-lg shadow-md transition-all duration-300"
                            onClick={() => setSelectedTask(task)}
                          >
                            Pay
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center text-gray-500 py-6">No Pending Expenses</div>
              )
            ) : completedTasks.length > 0 ? (
              <table className="min-w-full bg-white shadow-md rounded-lg border-separate border-spacing-0">
                <thead className="bg-gray-200 text-gray-600">
                  <tr>
                    <th className="py-3 px-6 text-left">Date</th>
                    <th className="py-3 px-6 text-left">Amount</th>
                    <th className="py-3 px-6 text-left">Particulars</th>
                    <th className="py-3 px-6 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {completedTasks.map((task, index) => (
                    <tr
                      key={index}
                      className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                    >
                      <td className="py-4 px-6">{task.date}</td>
                      <td className="py-4 px-6">{task.amount}</td>
                      <td className="py-4 px-6">{task.particulars}</td>
                      <td className="py-4 px-6">
                        <div
                          className={`px-3 py-1 font-semibold rounded-lg shadow-md ${task.status ? "bg-green-200 text-green-500" : "bg-red-200 text-red-500"}`}
                        >
                          {task.status ? "SUCCESS" : "FAILURE"}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center text-gray-500 py-6">No Payment History</div>
            )}
          </div>
        </div>

        {selectedTask && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-80">
              <h3 className="text-lg font-semibold mb-4">Confirm Payment</h3>
              <p className="text-gray-700 mb-4">
                The amount of <strong>{selectedTask.amount}</strong> for <strong>{selectedTask.particulars}</strong> will be deducted from your wallet.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  className="bg-gray-300 text-gray-800 py-1 px-4 rounded hover:bg-gray-400"
                  onClick={() => setSelectedTask(null)}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-600 text-white py-1 px-4 rounded hover:bg-red-700"
                  onClick={() => handlePay(selectedTask)}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WalletPage;
