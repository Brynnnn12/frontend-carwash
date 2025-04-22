import React, { useState } from "react";
import TransactionModal from "../../components/Dashboard/Transactions/TransactionModal";
import TransactionTable from "../../components/Dashboard/Transactions/TransactionTable";

export default function Transactions() {
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
      <TransactionTable onEdit={handleEdit} onCreate={handleCreate} />
      <TransactionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        editData={editData}
      />
    </div>
  );
}
