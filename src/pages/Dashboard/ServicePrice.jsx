import React, { useState } from "react";
import PriceTable from "../../components/Dashboard/ServicePrice/PriceTable";
import PriceModal from "../../components/Dashboard/ServicePrice/PriceModal";

export default function ServicePrice() {
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
      <PriceTable onEdit={handleEdit} onCreate={handleCreate} />
      <PriceModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        editData={editData}
      />
    </div>
  );
}
