import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchServices,
  deleteService,
  resetServiceState,
} from "../../../app/features/serviceSlice";
import { FaDragon, FaEye } from "react-icons/fa";

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
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-gray-700 font-bold">Daftar Layanan</h2>
        <button onClick={onCreate} className="btn btn-primary">
          Tambah Layanan
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <table className="table bg-gray-100 w-full text-gray-700">
        <thead>
          <tr className="text-gray-700">
            <th>Nama</th>
            <th>Harga</th>
            <th>Durasi</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td>{service.name}</td>
              <td>Rp {service.price.toLocaleString()}</td>
              <td>{service.description}</td>
              <td>
                <button
                  onClick={() => onEdit(service)}
                  className="btn btn-sm btn-info mr-2"
                >
                  <FaEye />
                </button>
                <button
                  onClick={() => dispatch(deleteService(service.id))}
                  className="btn btn-sm btn-error"
                >
                  <FaDragon />
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
