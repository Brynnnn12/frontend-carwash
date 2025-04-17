import { FaMoneyBillWave, FaSearch, FaFileInvoice } from "react-icons/fa";
import { BsFilter } from "react-icons/bs";

const Transactions = () => {
  // Sample transaction data
  const transactions = [
    {
      id: "TRX-001",
      date: "2023-06-15",
      customer: "John Doe",
      service: "Premium Wash",
      amount: 75000,
      payment: "Cash",
      status: "Completed",
    },
    {
      id: "TRX-002",
      date: "2023-06-15",
      customer: "Jane Smith",
      service: "Basic Wash",
      amount: 50000,
      payment: "Transfer",
      status: "Completed",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Transaction History</h1>
        <div className="flex space-x-2">
          <button className="btn btn-outline">
            <BsFilter className="mr-2" />
            Filter
          </button>
          <button className="btn btn-primary">
            <FaFileInvoice className="mr-2" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="form-control flex-1">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search transactions..."
                className="input input-bordered w-full"
              />
              <button className="btn btn-square">
                <FaSearch />
              </button>
            </div>
          </div>
          <div className="flex space-x-2">
            <input type="date" className="input input-bordered" />
            <input type="date" className="input input-bordered" />
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Service</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Invoice</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((trx) => (
                <tr key={trx.id}>
                  <td>{trx.id}</td>
                  <td>{trx.date}</td>
                  <td>{trx.customer}</td>
                  <td>{trx.service}</td>
                  <td>
                    <div className="flex items-center">
                      <FaMoneyBillWave className="text-green-500 mr-2" />
                      Rp {trx.amount.toLocaleString()}
                    </div>
                  </td>
                  <td>{trx.payment}</td>
                  <td>
                    <span className="badge badge-success">{trx.status}</span>
                  </td>
                  <td>
                    <button className="btn btn-ghost btn-xs">view</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center">
        <div className="btn-group">
          <button className="btn">«</button>
          <button className="btn btn-active">1</button>
          <button className="btn">2</button>
          <button className="btn">3</button>
          <button className="btn">»</button>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
