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
      <table className="min-w-full bg-gray-100 text-black rounded shadow">
        <thead className="bg-gray-300 text-black">
          <tr>
            <th className="p-3 text-left">No</th>
            <th className="p-3 text-left">User</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Rating</th>
            <th className="p-3 text-left">Comment</th>
            <th className="p-3 text-left">Avatar</th>
            <th className="p-3 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="7" className="text-center py-6">
                Loading...
              </td>
            </tr>
          ) : testimonials.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-6">
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
                  <img
                    src={t.user?.profile?.avatar}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="p-2">
                  <div className="flex gap-3">
                    <button
                      onClick={() => onEdit(t)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Hapus"
                    >
                      <FaTrash size={18} />
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
