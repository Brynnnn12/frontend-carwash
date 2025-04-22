import { useSelector, useDispatch } from "react-redux";
import { clearCurrentTransaction } from "@/features/transaction/transactionSlice";

export default function TransactionDetailModal() {
  const { current } = useSelector((state) => state.transaction);
  const dispatch = useDispatch();

  if (!current) return null;

  return (
    <>
      <input
        type="checkbox"
        id="transaction-detail-modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-3xl">
          <h3 className="font-bold text-lg mb-4">Detail Transaksi</h3>
          <div className="space-y-2">
            <div>
              <strong>ID:</strong> {current.id}
            </div>
            <div>
              <strong>Booking:</strong> {current.Booking?.id}
            </div>
            <div>
              <strong>Service:</strong>{" "}
              {current.Booking?.ServicePrice?.Service?.name}
            </div>
            <div>
              <strong>Total:</strong> Rp {current.totalPrice}
            </div>
            <div>
              <strong>Status:</strong>{" "}
              {current.isPaid ? "Lunas" : "Belum Lunas"}
            </div>
            {current.paymentProof && (
              <div>
                <strong>Bukti Pembayaran:</strong>
                <br />
                <img
                  src={current.paymentProof}
                  alt="Bukti"
                  className="w-48 mt-2 rounded"
                />
              </div>
            )}
          </div>
          <div className="modal-action">
            <label
              htmlFor="transaction-detail-modal"
              className="btn"
              onClick={() => dispatch(clearCurrentTransaction())}
            >
              Tutup
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
