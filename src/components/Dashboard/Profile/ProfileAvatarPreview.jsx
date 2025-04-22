import { useState, useEffect } from "react";

const ProfileAvatarPreview = ({ initialPreview, onFileChange }) => {
  const [preview, setPreview] = useState(
    initialPreview || "/default-avatar.png"
  );

  useEffect(() => {
    if (initialPreview) setPreview(initialPreview);
  }, [initialPreview]);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileChange(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center mb-4">
      <div className="relative group">
        <img
          src={preview}
          alt="Avatar"
          className="w-32 h-32 object-cover rounded-full shadow-lg border-4 border-blue-100"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-white text-sm font-medium">Ubah Foto</span>
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="mt-2 block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
    </div>
  );
};

export default ProfileAvatarPreview;
