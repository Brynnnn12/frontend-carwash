import { FaCar, FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const ServicePrice = () => {
  // Sample service data
  const services = [
    {
      id: 1,
      name: "Basic Wash",
      description: "Exterior wash and dry",
      duration: "30 mins",
      price: 50000,
      vehicles: ["All"],
    },
    {
      id: 2,
      name: "Premium Wash",
      description: "Exterior wash, dry, and wax",
      duration: "45 mins",
      price: 75000,
      vehicles: ["All"],
    },
    {
      id: 3,
      name: "Interior Cleaning",
      description: "Vacuum and interior wipe down",
      duration: "1 hour",
      price: 100000,
      vehicles: ["Sedan", "SUV"],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Service Price List</h1>
        <button className="btn btn-primary">
          <FaPlus className="mr-2" />
          Add New Service
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="card bg-white shadow-md">
            <div className="card-body">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="card-title">
                    <FaCar className="text-blue-500 mr-2" />
                    {service.name}
                  </h2>
                  <p className="text-gray-600">{service.description}</p>
                </div>
                <div className="badge badge-primary">
                  Rp {service.price.toLocaleString()}
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Duration:</span>
                  <span className="font-medium">{service.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Vehicle Types:</span>
                  <div className="flex flex-wrap gap-1 justify-end">
                    {service.vehicles.map((vehicle, i) => (
                      <span key={i} className="badge badge-outline">
                        {vehicle}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card-actions justify-end mt-4">
                <button className="btn btn-sm btn-outline btn-primary">
                  <FaEdit className="mr-1" />
                  Edit
                </button>
                <button className="btn btn-sm btn-outline btn-error">
                  <FaTrash className="mr-1" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Service Modal (hidden by default) */}
      <dialog id="add_service_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Service</h3>
          <div className="py-4 space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Service Name</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                className="textarea textarea-bordered"
                placeholder="Description"
              ></textarea>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Duration (minutes)</span>
                </label>
                <input
                  type="number"
                  placeholder="30"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Price</span>
                </label>
                <div className="input-group">
                  <span>Rp</span>
                  <input
                    type="number"
                    placeholder="50000"
                    className="input input-bordered"
                  />
                </div>
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Vehicle Types</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {["Sedan", "SUV", "MPV", "Truck", "Motorcycle"].map((type) => (
                  <div key={type} className="form-control">
                    <label className="label cursor-pointer">
                      <input type="checkbox" className="checkbox" />
                      <span className="label-text ml-2">{type}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-ghost">Cancel</button>
            </form>
            <button className="btn btn-primary">Save Service</button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ServicePrice;
