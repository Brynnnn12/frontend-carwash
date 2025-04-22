// src/pages/Dashboard/DashboardHome.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBookings } from "../../app/features/bookingSlice";
import { fetchTransactions } from "../../app/features/transactionSlice";
import { FaClipboardList, FaMoneyCheckAlt } from "react-icons/fa";

const DashboardHome = () => {
  const dispatch = useDispatch();
  const { bookings = [] } = useSelector((state) => state.bookings || {});
  const { items: transactions = [] } = useSelector(
    (state) => state.transaction || {}
  );

  useEffect(() => {
    dispatch(getUserBookings());
    dispatch(fetchTransactions({ page: 1, limit: 10 }));
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 py-6">
      {/* Card: Total Bookings */}
      <div className="card bg-blue-100 shadow-md hover:shadow-xl transition duration-300 border border-blue-200">
        <div className="card-body items-center text-center">
          <FaClipboardList className="text-4xl text-blue-600 mb-2" />
          <h2 className="card-title text-blue-800">Total Bookings</h2>
          <p className="text-4xl font-bold text-blue-700">{bookings.length}</p>
        </div>
      </div>

      {/* Card: Total Transactions */}
      <div className="card bg-green-100 shadow-md hover:shadow-xl transition duration-300 border border-green-200">
        <div className="card-body items-center text-center">
          <FaMoneyCheckAlt className="text-4xl text-green-600 mb-2" />
          <h2 className="card-title text-green-800">Total Transactions</h2>
          <p className="text-4xl font-bold text-green-700">
            {transactions.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
