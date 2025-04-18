import React, { useState } from "react";
import ServiceTable from "../../components/Dashboard/Service/ServiceTable";
import ServiceModal from "../../components/Dashboard/Service/ServiceModal";

export default function Service() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleEdit = (data) => {
    setEditData(data);
    setModalOpen(true);
  };

  const handleCreate = () => {
    setEditData(null);
    setModalOpen(true);
  };

  return (
    <div className="p-4">
      <ServiceTable onEdit={handleEdit} onCreate={handleCreate} />
      <ServiceModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        editData={editData}
      />
    </div>
  );
}
