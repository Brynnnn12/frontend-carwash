import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getServicePrices,
  deleteServicePrice,
} from "../../../app/features/servicePrice";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function PriceTable({ onEdit, onCreate }) {
  const dispatch = useDispatch();
  const { servicePrices, loading, error } = useSelector(
    (state) => state.servicePrices
  );

  useEffect(() => {
    dispatch(getServicePrices());
  }, [dispatch]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-gray-700 font-bold">
          Daftar Harga Layanan
        </h2>
        <button onClick={onCreate} className="btn btn-primary">
          Tambah Harga
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && (
        <p className="text-red-500">{error.message || "Terjadi kesalahan."}</p>
      )}

      <table className="table overflow-x-auto w-full text-gray-700">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th>No</th>
            <th>Nama Layanan</th>
            <th>Tipe Mobil</th>
            <th>Harga</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {servicePrices.map((price, index) => (
            <tr className="text-black" key={price.id}>
              <td>{index + 1}</td>
              <td>{price.service?.name}</td>
              <td>{price.car_type}</td>
              <td>Rp {parseInt(price.price).toLocaleString()}</td>
              <td>
                <button
                  onClick={() => onEdit(price)}
                  className="btn btn-sm btn-info mr-2"
                >
                  <FiEdit />
                </button>
                <button
                  onClick={() => dispatch(deleteServicePrice(price.id))}
                  className="btn btn-sm btn-error"
                >
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
