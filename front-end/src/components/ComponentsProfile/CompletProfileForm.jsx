// /* eslint-disable react/prop-types */
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useSelector } from "react-redux";
// import { useEffect } from "react";

// function CompletProfileForm({
//   UserName,
//   Localisation,
//   Telephone,
//   handleSubmit,
//   setUserName,
//   setLocalisation,
//   setTelephone,
//   handleCoverUpload,
//   handleProfileUpload,
//   ProfileCover,
//   ProfileImage,
// }) {
//   const user = useSelector((state) => state.auth.user);
//   useEffect(() => {
//     setUserName(user.name);
//   }, [user, setUserName]);
//   return (
//     <div className="bg-white top-0 w-full ld:w-[26%] p-6 space-y-6 border-r h-screen overflow-y-auto shadow-xl">
//       <div>
//         <h1 className="text-2xl font-bold mt-1">Complet Ton Profile</h1>
//       </div>

//       <div className="flex items-center space-x-3">
//         <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
//           <span className="font-semibold text-gray-600">N</span>
//         </div>
//         <div>
//           <div className="font-semibold">Noureddine Läktab</div>
//           <div className="text-sm text-gray-500">Admin</div>
//         </div>
//       </div>

//       <form
//         onSubmit={handleSubmit}
//         className="space-y-4"
//         encType="multipart/form-data"
//       >
//         <div>
//           <Input
//             placeholder="Nom Complet"
//             value={UserName}
//             name="name"
//             onChange={(e) => setUserName(e.target.value)}
//             className="w-full border rounded p-2 mt-4"
//           />

//           <Input
//             placeholder="Localisation"
//             value={Localisation}
//             name="localisation"
//             onChange={(e) => setLocalisation(e.target.value)}
//             className="w-full border rounded p-2 mt-4"
//           />

//           <Input
//             placeholder="Telephone"
//             value={Telephone}
//             name="telephone"
//             onChange={(e) => setTelephone(e.target.value)}
//             className="w-full border rounded p-2 mt-4"
//           />
//         </div>
//         <div>
//           <div className="text-sm text-gray-500 mb-1">Photo de couverture</div>
//           <input
//             type="file"
//             name="couverture"
//             // onChange={(e) => {
//             //   handleCoverUpload(e);
//             //   setCouverture(e.target.files);
//             // }}
//             onChange={handleCoverUpload}
//             accept="image/*"
//             className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
//           />
//           {ProfileCover && (
//             <div className="mt-2">
//               <img
//                 src={ProfileCover}
//                 alt="Cover preview"
//                 className="h-20 rounded-md object-cover"
//               />
//             </div>
//           )}
//         </div>

//         <div>
//           <div className="text-sm text-gray-500 mb-1">Photo de profil</div>
//           <input
//             type="file"
//             onChange={handleProfileUpload}
//             // onChange={(e) => {
//             //   handleProfileUpload(e);
//             //   setImage_profile(e.target.files);
//             // }}
//             name="image_profile"
//             accept="image/*"
//             className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
//           />
//           {ProfileImage && (
//             <div className="mt-2">
//               <img
//                 src={ProfileImage}
//                 alt="Profile preview"
//                 className="h-20 w-20 rounded-full object-cover"
//               />
//             </div>
//           )}
//         </div>
//         <div className="w-full ">
//           <Button
//             className={`w-full  bg-gray-200 font-bold transform text-black hover:bg-gray-300 ${
//               UserName !== "" ? "bg-blue-600 text-white" : ""
//             }`}
//           >
//             Créer
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default CompletProfileForm;


"use client";

/* eslint-disable react/prop-types */
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function CompletProfileForm({
  loading,
  UserName,
  Localisation,
  Telephone,
  workplace,
  relationship_status,
  partner,
  job_title,
  date_of_birth,
  gender,
  website,
  handleSubmit,
  setUserName,
  setLocalisation,
  setTelephone,
  setWorkplace,
  setRelationshipStatus,
  setPartner,
  setJobTitle,
  setDateOfBirth,
  setGender,
  setWebsite,
  handleCoverUpload,
  handleProfileUpload,
  ProfileCover,
  ProfileImage,
}) {
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    setUserName(user.name);
  }, [user, setUserName]);

  return (
    <div className="bg-white top-0 w-full ld:w-[26%] p-6 space-y-6 border-r h-screen overflow-y-auto shadow-xl">
      <div>
        <h1 className="text-2xl font-bold mt-1">Complet Ton Profile</h1>
      </div>

      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          {user.image_profile_url ? (
            <img src={user.image_profile_url} className="w-full h-full object-cover rounded-full" />
          ) : (
            <span className="font-semibold text-gray-600">
              {user.name.charAt(0)}
            </span>
          )}
        </div>
        <div>
          <div className="font-semibold">{user.name}</div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        encType="multipart/form-data"
      >
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-500 mb-1 block">
              Informations personnelles
            </label>
            <Input
              placeholder="Nom Complet"
              value={UserName}
              name="name"
              onChange={(e) => setUserName(e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                placeholder="Localisation"
                value={Localisation}
                name="localisation"
                onChange={(e) => setLocalisation(e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>

            <div>
              <Input
                placeholder="Telephone"
                value={Telephone}
                name="telephone"
                onChange={(e) => setTelephone(e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>
          </div>

          <div>
            <Input
              placeholder="Site web"
              value={website}
              name="website"
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                type="date"
                placeholder="Date de naissance"
                value={date_of_birth}
                name="date_of_birth"
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>

            <div>
              <select
                value={gender}
                name="gender"
                onChange={(e) => setGender(e.target.value)}
                className="w-full border rounded p-2 h-10 bg-white"
              >
                <option value="">Sélectionner genre</option>
                <option value="male">Homme</option>
                <option value="female">Femme</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm text-gray-500 mb-1 block">
            Informations professionnelles
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                placeholder="Lieu de travail"
                value={workplace}
                name="workplace"
                onChange={(e) => setWorkplace(e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>

            <div>
              <Input
                placeholder="Titre du poste"
                value={job_title}
                name="job_title"
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm text-gray-500 mb-1 block">
            Statut relationnel
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <select
                value={relationship_status}
                name="relationship_status"
                onChange={(e) => setRelationshipStatus(e.target.value)}
                className="w-full border rounded p-2 h-10 bg-white"
              >
                <option value="">Sélectionner statut</option>
                <option value="single">Célibataire</option>
                <option value="in_relationship">En couple</option>
                <option value="engaged">Fiancé(e)</option>
                <option value="married">Marié(e)</option>
                <option value="complicated">C'est compliqué</option>
              </select>
            </div>

            <div>
              <Input
                placeholder="Partenaire"
                value={partner}
                name="partner"
                onChange={(e) => setPartner(e.target.value)}
                className="w-full border rounded p-2"
                disabled={
                  relationship_status === "single" || relationship_status === ""
                }
              />
            </div>
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-500 mb-1">Photo de couverture</div>
          <input
            type="file"
            name="couverture"
            onChange={handleCoverUpload}
            accept="image/*"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
          />
          {ProfileCover && (
            <div className="mt-2">
              <img
                src={ProfileCover || "/placeholder.svg"}
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
            name="image_profile"
            accept="image/*"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
          />
          {ProfileImage && (
            <div className="mt-2">
              <img
                src={ProfileImage || "/placeholder.svg"}
                alt="Profile preview"
                className="h-20 w-20 rounded-full object-cover"
              />
            </div>
          )}
        </div>

        <div className="w-full pt-4">
          <Button
            className={`w-full py-2.5 bg-gray-200 font-bold transform text-black hover:bg-gray-300 ${
              UserName !== "" ? "bg-blue-600 text-white hover:bg-blue-700" : ""
            }`}
          >
            {loading ? "en cour de complet ..." : "Completer"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CompletProfileForm;
