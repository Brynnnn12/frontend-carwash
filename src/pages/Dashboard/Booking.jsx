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

export default function Bookings() {
  const dispatch = useDispatch();
  const { bookings, currentBooking, loading, error } = useSelector(
    (state) => state.bookings
  );

  const { servicePrices } = useSelector((state) => state.servicePrices);
  // console.log(servicePrices);
  const { data: profile } = useSelector((state) => state.profile);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [formData, setFormData] = useState({
    servicePriceId: "",
    bookingDate: "",
    bookingTime: "",
    licensePlate: "",
    status: "pending",
  });

  useEffect(() => {
    dispatch(getUserBookings());
    dispatch(getServicePrices({ page: 1, limit: 100 }));
  }, [dispatch]);

  const handleOpenCreate = () => {
    setFormData({
      servicePriceId: "",
      bookingDate: "",
      bookingTime: "",
      licensePlate: "",
      status: "pending",
    });
    setIsEditMode(false);
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
    setIsModalOpen(true);
  };

  const handleViewDetail = (booking) => {
    dispatch(getBookingById(booking.id));
    setShowDetail(true);
  };

  const handleDelete = (booking) => {
    dispatch(deleteBooking(booking.id));
  };

  const handleSubmit = () => {
    const bookingData = {
      userId: profile?.userId,
      name: profile?.name,
      phone: profile?.phone,
      servicePriceId: formData.servicePriceId,
      bookingDate: formData.bookingDate,
      bookingTime: formData.bookingTime,
      licensePlate: formData.licensePlate,
      status: formData.status,
    };

    if (isEditMode) {
      dispatch(updateBooking({ id: formData.id, bookingData }));
    } else {
      dispatch(createBooking(bookingData));
    }

    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    dispatch(clearBookingError());
    dispatch(resetCurrentBooking());
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    dispatch(resetCurrentBooking());
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Manajemen Booking
          </h2>
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
    </div>
  );
}
