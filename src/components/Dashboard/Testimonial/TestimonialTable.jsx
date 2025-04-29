import { useDispatch } from "react-redux";
import { deleteTestimonial } from "../../../app/features/testimonialSlice";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function TestimonialTable({ testimonials, onEdit, loading }) {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteTestimonial(id));
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-100 text-xs md:text-sm text-black rounded shadow">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="p-3 text-left">No</th>
            <th className="p-3 text-left">User</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Rating</th>
            <th className="p-3 text-left">Comment</th>
            <th className="p-3 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center py-6">
                Loading...
              </td>
            </tr>
          ) : testimonials.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-6">
                Tidak ada data.
              </td>
            </tr>
          ) : (
            testimonials.map((t, i) => (
              <tr
                key={t.id}
                className="hover:bg-gray-200 transition-colors duration-200"
              >
                <td className="p-2">{i + 1}</td>
                <td className="p-2">{t.user?.username}</td>
                <td className="p-2">{t.user?.email}</td>
                <td className="p-2">{t.rating}</td>
                <td className="p-2">{t.comment}</td>

                <td className="p-2">
                  <div className="flex gap-3">
                    <button
                      onClick={() => onEdit(t)}
                      className="btn btn-sm btn-primary text-white"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="btn btn-sm btn-error "
                      title="Hapus"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
