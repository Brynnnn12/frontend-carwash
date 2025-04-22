import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTransactions,
  deleteTransaction,
  updatePaymentStatus,
} from "../../../app/features/transactionSlice";
import { FaEdit, FaTrash, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import toast from "react-hot-toast";

export default function TransactionTable({ onEdit }) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.data);
  const role = profile?.user?.role?.name;
  const isAdmin = role === "admin";

  const { items, loading } = useSelector((state) => state.transaction);

  useEffect(() => {
    dispatch(fetchTransactions({ page: 1, limit: 10 }));
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus transaksi ini?")) {
      dispatch(deleteTransaction(id));
    }
  };

  const handleToggleStatus = (tx) => {
    if (!tx.paymentProof) {
      toast.error("Lengkapi bukti pembayaran terlebih dahulu");
      return;
    }
    dispatch(updatePaymentStatus({ id: tx.id, isPaid: !tx.isPaid }));
  };

  return (
    <div className="card bg-base-100 shadow-xl p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Daftar Transaksi</h2>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Booking</th>
                <th>Total</th>
                <th>Status</th>
                <th>Bukti</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((tx, idx) => (
                <tr key={tx.id}>
                  <td>{idx + 1}</td>
                  <td>{tx.bookingId}</td>
                  <td>Rp {tx.totalAmount.toLocaleString()}</td>

                  <td>
                    {isAdmin ? (
                      <span
                        className={`badge ${
                          tx.isPaid ? "badge-success" : "badge-error"
                        } ${
                          !tx.paymentProof
                            ? "cursor-not-allowed opacity-50"
                            : "cursor-pointer"
                        }`}
                        onClick={() =>
                          tx.paymentProof && handleToggleStatus(tx)
                        }
                      >
                        {tx.isPaid ? "Sudah Dibayar" : "Belum Dibayar"}
                      </span>
                    ) : tx.isPaid ? (
                      <FaCheckCircle
                        className="text-green-500 text-lg"
                        title="Sudah Dibayar"
                      />
                    ) : (
                      <FaTimesCircle
                        className="text-red-500 text-lg"
                        title="Belum Dibayar"
                      />
                    )}
                  </td>

                  <td>
                    {tx.paymentProof ? (
                      <a
                        href={tx.paymentProof}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link link-primary"
                      >
                        Lihat
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="flex gap-2">
                    <button className="btn btn-sm" onClick={() => onEdit(tx)}>
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(tx.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
