import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchServices,
  deleteService,
  resetServiceState,
} from "../../../app/features/serviceSlice";

export default function ServiceTable({ onEdit, onCreate }) {
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector((state) => state.services);

  useEffect(() => {
    dispatch(fetchServices({}));
    return () => dispatch(resetServiceState());
  }, [dispatch]);

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
              <td>{service.duration}</td>
              <td>
                <button
                  onClick={() => onEdit(service)}
                  className="btn btn-sm btn-info mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => dispatch(deleteService(service.id))}
                  className="btn btn-sm btn-error"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
