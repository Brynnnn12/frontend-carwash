import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchServices,
  deleteService,
  resetServiceState,
} from "../../../app/features/serviceSlice";

import { FiEdit, FiTrash } from "react-icons/fi";

export default function ServiceTable({ onEdit, onCreate }) {
  const dispatch = useDispatch();
  const { services, loading, error, pagination } = useSelector(
    (state) => state.services
  );

  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    dispatch(fetchServices({ page, limit }));
    return () => dispatch(resetServiceState());
  }, [dispatch, page]);

  const handleNext = () => {
    if (page < pagination.totalPages) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-gray-700 font-bold">Daftar Layanan</h2>
        <button onClick={onCreate} className="btn btn-primary">
          Tambah Layanan
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <table className="table overflow-x-auto w-full text-gray-700">
        <thead className="bg-blue-500 text-white">
          <tr className="">
            <th>No</th>
            <th>Nama</th>
            <th>Harga</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service, index) => (
            <tr key={service.id}>
              <td>{index + 1}</td>
              <td>{service.name}</td>
              <td>Rp {service.price.toLocaleString()}</td>
              <td className="flex">
                <button
                  onClick={() => onEdit(service)}
                  className="btn btn-sm btn-info mr-2"
                >
                  <FiEdit />
                </button>
                <button
                  onClick={() => dispatch(deleteService(service.id))}
                  className="btn btn-sm btn-error"
                >
                  <FiTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex justify-center items-center gap-4">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="btn btn-sm"
        >
          « Prev
        </button>
        <span>
          Page {pagination.currentPage} of {pagination.totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={page === pagination.totalPages}
          className="btn btn-sm"
        >
          Next »
        </button>
      </div>
    </div>
  );
}
