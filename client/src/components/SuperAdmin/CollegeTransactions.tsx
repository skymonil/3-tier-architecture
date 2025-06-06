import { useState } from "react";

interface Transaction {
  id: string;
  type: string;
  amount: number;
  date: string; // format: YYYY-MM-DD
  direction: "in" | "out"; // 'in' for incoming, 'out' for outgoing
}

const CollegeTransactionJournal = () => {
  const [transactions, _setTransactions] = useState<Transaction[]>([
    {
      id: "txn001",
      type: "Journal",
      amount: 50000,
      date: "2024-11-01",
      direction: "in",
    },
    {
      id: "txn002",
      type: "Fees",
      amount: 20000,
      date: "2024-11-15",
      direction: "in",
    },
    {
      id: "txn003",
      type: "Scholarship",
      amount: 10000,
      date: "2024-12-01",
      direction: "out",
    },
    {
      id: "txn004",
      type: "ATKT Fees",
      amount: 5000,
      date: "2024-12-05",
      direction: "in",
    },
    {
      id: "txn005",
      type: "Scholarship",
      amount: 15000,
      date: "2024-12-10",
      direction: "out",
    },
  ]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredTransactions, setFilteredTransactions] =
    useState<Transaction[]>(transactions);

  // Filter transactions based on date range
  const handleFilter = () => {
    if (!startDate || !endDate) {
      setFilteredTransactions(transactions); // Show all transactions if no date range is set
    } else {
      const filtered = transactions.filter((transaction) => {
        return transaction.date >= startDate && transaction.date <= endDate;
      });
      setFilteredTransactions(filtered);
    }
  };

  // Handle printing of the transaction report
  const handlePrint = () => {
    const printContent =
      document.getElementById("transaction-table")?.innerHTML;
    const printWindow = window.open("", "_blank");

    // Add print-specific CSS to the print window
    printWindow?.document.write(`
      <html>
        <head>
          <title>Transaction Report</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              padding: 10px;
              text-align: left;
              border: 1px solid #ddd;
            }
            th {
              background-color: #f4f4f4;
              font-weight: bold;
            }
            tr:nth-child(even) {
              background-color: #f9f9f9;
            }
            tr:hover {
              background-color: #f1f1f1;
            }
            h2 {
              text-align: center;
              margin-bottom: 20px;
            }
          </style>
        </head>
        <body>
          <h2>College Transaction Journal</h2>
          <table>
            <thead>
              <tr>
              </tr>
            </thead>
            <tbody>
              ${printContent || ""}
            </tbody>
          </table>
        </body>
      </html>
    `);

    printWindow?.document.close();
    printWindow?.print();
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        College Transaction Journal
      </h2>

      {/* Filter Section */}
      <div className="mb-4 flex flex-wrap justify-between items-center">
        <div className="flex flex-col md:flex-row space-x-4 mb-4 sm:mb-0">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full sm:w-auto"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full sm:w-auto ml-0"
            style={{ marginLeft: 0 }}
          />
        </div>
        <button
          onClick={handleFilter}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
        >
          Filter
        </button>
      </div>

      {/* Transaction Table */}
      <div className="overflow-x-auto mb-4">
        <table
          id="transaction-table"
          className="min-w-full table-auto bg-white shadow-md rounded-lg"
        >
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
                Transaction ID
              </th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
                Type
              </th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
                Amount
              </th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
                Date
              </th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
                Direction
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4 text-sm text-gray-700">
                  {transaction.id}
                </td>
                <td className="py-2 px-4 text-sm text-gray-600">
                  {transaction.type}
                </td>
                <td className="py-2 px-4 text-sm text-gray-600">
                  {transaction.amount}
                </td>
                <td className="py-2 px-4 text-sm text-gray-600">
                  {transaction.date}
                </td>
                <td className="py-2 px-4 text-sm text-gray-600">
                  {transaction.direction === "in" ? "Incoming" : "Outgoing"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Print Button */}
      <div className="flex justify-end">
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200"
        >
          Print Report
        </button>
      </div>
    </div>
  );
};

export default CollegeTransactionJournal;
