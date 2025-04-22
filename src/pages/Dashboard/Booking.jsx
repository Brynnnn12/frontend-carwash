import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createBooking,
  updateBooking,
  deleteBooking,
  getBookingById,
  clearBookingError,
  resetCurrentBooking,
  getUserBookings,
} from "../../app/features/bookingSlice";
import { getServicePrices } from "../../app/features/servicePrice";
import BookingTable from "../../components/Dashboard/Booking/BookingTable";
import BookingModal from "../../components/Dashboard/Booking/BookingModal";
import BookingDetail from "../../components/Dashboard/Booking/BookingDetail";
import toast from "react-hot-toast";

const defaultFormData = {
  servicePriceId: "",
  bookingDate: "",
  bookingTime: "",
  licensePlate: "",
  status: "pending",
};

export default function Bookings() {
  const dispatch = useDispatch();
  const { bookings, currentBooking, loading, error } = useSelector(
    (state) => state.bookings
  );
  const { servicePrices } = useSelector((state) => state.servicePrices);
  const { data: profile } = useSelector((state) => state.profile);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    dispatch(getUserBookings());
  }, [dispatch]);

  // 🔹 Modal Handlers
  const handleOpenCreate = () => {
    if (!profile?.name || !profile?.phoneNumber || !profile?.address) {
      toast.error("Lengkapi data diri terlebih dahulu");
      return;
    }
    setFormData(defaultFormData);
    setIsEditMode(false);
    dispatch(getServicePrices({ page: 1, limit: 100 }));
    setIsModalOpen(true);
  };

  const handleOpenEdit = (booking) => {
    setFormData({
      id: booking.id,
      servicePriceId: booking.servicePriceId || "",
      bookingDate: booking.bookingDate || "",
      bookingTime: booking.bookingTime || "",
      licensePlate: booking.licensePlate || "",
      status: booking.status || "pending",
    });
    setIsEditMode(true);
    dispatch(getServicePrices({ page: 1, limit: 100 }));
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    dispatch(clearBookingError());
    dispatch(resetCurrentBooking());
  };

  // 🔹 Detail View Handler
  const handleViewDetail = (booking) => {
    dispatch(getBookingById(booking.id));
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    dispatch(resetCurrentBooking());
  };

  // 🔹 CRUD Handlers
  const handleDelete = (booking) => {
    dispatch(deleteBooking(booking.id));
  };

  const handleSubmit = () => {
    if (!profile?.name || !profile?.phoneNumber || !profile?.address) {
      toast.error("Lengkapi data diri terlebih dahulu");
      return;
    }
    const bookingData = {
      servicePriceId: formData.servicePriceId,
      bookingDate: formData.bookingDate,
      bookingTime: formData.bookingTime,
      licensePlate: formData.licensePlate,
    };

    const action = isEditMode
      ? updateBooking({ id: formData.id, bookingData })
      : createBooking(bookingData);

    dispatch(action).then(() => dispatch(getUserBookings()));
    setIsModalOpen(false);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Manajemen Booking</h2>
        <button
          className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleOpenCreate}
        >
          Tambah Booking
        </button>
      </div>

      <BookingTable
        bookings={bookings}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
        onView={handleViewDetail}
        loading={loading}
      />

      <BookingModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        isEditMode={isEditMode}
        error={error}
        loading={loading}
        servicePrices={servicePrices}
        profile={profile}
      />

      {showDetail && currentBooking && (
        <BookingDetail booking={currentBooking} onClose={handleCloseDetail} />
      )}
    </div>
  );
}
