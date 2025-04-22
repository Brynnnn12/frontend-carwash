import ProfileForm from "../../components/Dashboard/Profile/ProfileForm";

const Profil = () => {
  return (
    <div className="min-h-screen p-4 bg-base-200">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6">Profil Saya</h1>
        <ProfileForm />
      </div>
    </div>
  );
};

export default Profil;
