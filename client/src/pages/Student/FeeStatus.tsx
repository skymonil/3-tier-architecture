import { useState } from "react";
import Navbar from "./Navbar";

const FeeStatus: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0); // New state to store payment amount
  const [walletBalance, setWalletBalance] = useState(60000); // Wallet balance
  const [paymentHistory, setPaymentHistory] = useState([
    {
      date: "23/12/2024",
      amount: 50000,
      transactionId: "TXN123456",
      method: "WALLET",
      status: "SUCCESS",
      receiptUrl:
        "https://d1i8qx905cixkx.cloudfront.net/bdd1BePz7xDvTzXMTDsXhsW8TAnQnG6Nr84RF3EuCo.png?timestamp=e38e291e45daedcb29dea3a1c07d4b1e3f1395dc&locale=en&limit_reached=false&powered_by_invoicehome=true&Expires=1736335226&Signature=GRgJJuz6WF-5dAj5c-oZEB0Lus342aw2w-VZvE9Y-F1o7hsJdqqz2yEfx~VByM9fn6zKcZoZm3pWQXBsaT8rmcKu4HwKCyVo8LM-FTUKUQOb7AKEgAlR54pwLiwdGCyPx0~rKgRkeo29Azr~lqBo82OxxAjI4YFWX1qBtd1nz55nt-T0qpS2Xs9Bb--TTXJsoLY00d0rnsJle47Luf~1~iCBmeVXxzdD7GbyNXk2iAXSO-HXPZ6mAd-f9S3OtrjZ9FewWvu4fhQS9OvnA3SN0KXbmeMZCTtNRHKRLt~nPiVBjeUGLp3alobpKxhlZkLf0ykHhvEN7f7neBbQoo~ygg__&Key-Pair-Id=APKAJ5JUFZUTW73QIUFQ",
    },
    {
      date: "21/12/2024",
      amount: 25000,
      transactionId: "TXN123457",
      method: "WALLET",
      status: "SUCCESS",
      receiptUrl:
        "https://d1i8qx905cixkx.cloudfront.net/bdd1BePz7xDvTzXMTDsXhsW8TAnQnG6Nr84RF3EuCo.png?timestamp=ceb35663d04b60cd1c57e17634a44d724d308386&locale=en&limit_reached=false&powered_by_invoicehome=true&Expires=1736335454&Signature=oeE16ZpverOx12sqO3eDLY0MNWgwKw733u7Y~X4qgJNfuNEQcbqT6cP~nMMvozsAFMAt-3Gq-S~m2Ikl797ICbYGHQyn-Ey41ibSIRjPyaDRjdu8d4oAnChsvFjWunbT6pDe9yV7yWtUONSqtLvCfkv0bAg9j78i6Of-TNJBWldqOBiwSNjZdZS2vXixN1VTa5hEo30dz7YJLVqdu0JXmNceBfdNSRHPYAQcWGv7KUAgH3GxMaLkJK2hyJ5F6Y~Wp702Cb-4cKDTx51zI3ETaRMZl2Hgs4puWNxTvtbk6tbA~~eb1FxAZHubT2-wU~9qIqauHsUN-O1lBZPZYWWq3A__&Key-Pair-Id=APKAJ5JUFZUTW73QIUFQ",
    },
  ]);

  const totalFee = 125000;
  const totalPaid = paymentHistory.reduce((acc, payment) => acc + payment.amount, 0);
  const balanceDue = totalFee - totalPaid;

  const handleAddFundsClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handlePayWithWallet = () => {
    if (walletBalance >= 50000) {
      const newPayment = {
        date: new Date().toLocaleDateString(),
        amount: 50000,
        transactionId: `TXN${Date.now()}`,
        method: "WALLET",
        status: "SUCCESS",
        receiptUrl:
          "https://d1i8qx905cixkx.cloudfront.net/bdd1BePz7xDvTzXMTDsXhsW8TAnQnG6Nr84RF3EuCo.png?timestamp=e38e291e45daedcb29dea3a1c07d4b1e3f1395dc&locale=en&limit_reached=false&powered_by_invoicehome=true&Expires=1736335226&Signature=GRgJJuz6WF-5dAj5c-oZEB0Lus342aw2w-VZvE9Y-F1o7hsJdqqz2yEfx~VByM9fn6zKcZoZm3pWQXBsaT8rmcKu4HwKCyVo8LM-FTUKUQOb7AKEgAlR54pwLiwdGCyPx0~rKgRkeo29Azr~lqBo82OxxAjI4YFWX1qBtd1nz55nt-T0qpS2Xs9Bb--TTXJsoLY00d0rnsJle47Luf~1~iCBmeVXxzdD7GbyNXk2iAXSO-HXPZ6mAd-f9S3OtrjZ9FewWvu4fhQS9OvnA3SN0KXbmeMZCTtNRHKRLt~nPiVBjeUGLp3alobpKxhlZkLf0ykHhvEN7f7neBbQoo~ygg__&Key-Pair-Id=APKAJ5JUFZUTW73QIUFQ",
      };
      setPaymentHistory([newPayment, ...paymentHistory]);
      setWalletBalance(walletBalance - 50000);
      setPaymentAmount(50000); // Set the payment amount that was made
      setShowModal(true); // Show the modal after successful payment
    } else {
      alert("Insufficient wallet balance.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="border-b pb-4 mb-4">
            <h1 className="text-2xl font-bold text-center text-[#9c231b]">
              Fee Status
            </h1>
          </div>

          {/* Fee Summary Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-200 p-4 rounded-lg text-center flex flex-col justify-center">
              <p className="text-sm">Total Fee</p>
              <p className="text-lg font-bold">₹{totalFee}</p>
            </div>
            <div className="bg-green-200 p-4 rounded-lg text-center flex flex-col justify-center">
              <p className="text-sm">Paid Amount</p>
              <p className="text-lg font-bold">₹{totalPaid}</p>
            </div>
            <div className="bg-red-200 p-4 rounded-lg text-center flex flex-col justify-center">
              <p className="text-sm">Balance Due</p>
              <p className="text-lg font-bold">₹{balanceDue}</p>
              <p className="text-xs">Due by 31/12/2024</p>
            </div>
          </div>

          {/* Wallet Balance Section */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 ml-2">
              <i className="fas fa-wallet"></i> Wallet Balance
            </h2>
            <div className="bg-gray-100 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-center">
              <p className="text-lg font-bold mb-2 sm:mb-0">₹{walletBalance}</p>
              <div className="space-y-2 sm:space-y-0 sm:space-x-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
                  onClick={handleAddFundsClick}
                >
                  <i className="fas fa-plus mr-1"></i> Add Funds
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
                  onClick={handlePayWithWallet}
                >
                  <i className="fas fa-wallet mr-1"></i> Pay with Wallet
                </button>
              </div>
            </div>
          </div>

          {/* Payment History Section */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 ml-2">
              <i className="fas fa-receipt mr-2"></i>
              Payment History
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200 text-center">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 px-4 py-2">Date</th>
                    <th className="border border-gray-200 px-4 py-2">Amount</th>
                    <th className="border border-gray-200 px-4 py-2">
                      Transaction ID
                    </th>
                    <th className="border border-gray-200 px-4 py-2">Method</th>
                    <th className="border border-gray-200 px-4 py-2">Status</th>
                    <th className="border border-gray-200 px-4 py-2">
                      Receipt
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((payment, index) => (
                    <tr key={index}>
                      <td className="border border-gray-200 px-4 py-2">
                        {payment.date}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        ₹{payment.amount}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {payment.transactionId}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {payment.method}
                      </td>
                      <td
                        className={`border border-gray-200 px-4 py-2 ${payment.status === "SUCCESS"
                            ? "text-green-500"
                            : "text-red-500"
                          }`}
                      >
                        {payment.status}
                      </td>
                      <td
                        className="border border-gray-200 px-4 py-2 text-blue-500 underline cursor-pointer"
                        onClick={() => window.open(payment.receiptUrl, "_blank")}
                        rel="noopener noreferrer"
                      >
                        <i className="fas fa-download"></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Support Section */}
          <div>
            <h2 className="text-lg font-semibold mb-2 ml-2">
              <i className="fas fa-headset mr-2"></i>
              Support
            </h2>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm text-gray-600">For fee-related queries:</p>
              <p className="text-sm font-medium">demo@egov.com</p>
              <p className="text-sm font-medium">+91-97135 12345</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h3 className="text-lg font-bold mb-4">Payment Successful</h3>
            <p className="text-sm">
              ₹{paymentAmount} has been successfully paid.
            </p>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeeStatus;
