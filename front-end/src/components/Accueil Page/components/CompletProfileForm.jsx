/* eslint-disable react/prop-types */
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function CompletProfileForm({
  UserName,
    setCouverture,
  setImage_profile,
  Localisation,
  Telephone,
  handleSubmit,
  setUserName,
  setLocalisation,
  setTelephone,
  handleCoverUpload,
  handleProfileUpload,
  ProfileCover,
  ProfileImage,
}) {
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    setUserName(user.name);
  }, [user]);
  return (
    <div className="bg-white top-0 w-full ld:w-[26%] p-6 space-y-6 border-r h-screen overflow-y-auto shadow-xl">
      <div>
        <h1 className="text-2xl font-bold mt-1">Complet Ton Profile</h1>
      </div>

      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="font-semibold text-gray-600">N</span>
        </div>
        <div>
          <div className="font-semibold">Noureddine Läktab</div>
          <div className="text-sm text-gray-500">Admin</div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        encType="multipart/form-data"
      >
        <div>
          <Input
            placeholder="Nom Complet"
            value={UserName}
            name="name"
            onChange={(e) => setUserName(e.target.value)}
            className="w-full border rounded p-2 mt-4"
          />

          <Input
            placeholder="Localisation"
            value={Localisation}
            name="localisation"
            onChange={(e) => setLocalisation(e.target.value)}
            className="w-full border rounded p-2 mt-4"
          />

          <Input
            placeholder="Telephone"
            value={Telephone}
            name="telephone"
            onChange={(e) => setTelephone(e.target.value)}
            className="w-full border rounded p-2 mt-4"
          />
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Photo de couverture</div>
          <input
            type="file"
            name="couverture"
            // onChange={(e) => {
            //   handleCoverUpload(e);
            //   setCouverture(e.target.files);
            // }}
            onChange={handleCoverUpload}
            accept="image/*"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
          />
          {ProfileCover && (
            <div className="mt-2">
              <img
                src={ProfileCover}
                alt="Cover preview"
                className="h-20 rounded-md object-cover"
              />
            </div>
          )}
        </div>

        <div>
          <div className="text-sm text-gray-500 mb-1">Photo de profil</div>
          <input
            type="file"
            onChange={handleProfileUpload}
            // onChange={(e) => {
            //   handleProfileUpload(e);
            //   setImage_profile(e.target.files);
            // }}
            name="image_profile"
            accept="image/*"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
          />
          {ProfileImage && (
            <div className="mt-2">
              <img
                src={ProfileImage}
                alt="Profile preview"
                className="h-20 w-20 rounded-full object-cover"
              />
            </div>
          )}
        </div>
        <div className="w-full ">
          <Button
            className={`w-full  bg-gray-200 font-bold transform text-black hover:bg-gray-300 ${
              UserName !== "" ? "bg-blue-600 text-white" : ""
            }`}
          >
            Créer
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CompletProfileForm;
