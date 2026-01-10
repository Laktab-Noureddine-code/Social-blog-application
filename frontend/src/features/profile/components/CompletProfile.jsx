// import { useEffect, useState } from "react";

// import { useSelector } from "react-redux";
// import CompletProfileForm from "./CompletProfileForm";
// import ProfilePreview from "./ProfilePreview";

// export default function CompletProfile() {
//   const state = useSelector((state) => state);
//   const [UserName, setUserName] = useState(state.auth.user.name);
//   const [Telephone, setTelephone] = useState("");
//   const [Localisation, setLocalisation] = useState("");
//   const [ProfileCover, setProfileCover] = useState(null);
//   const [couverture, setCouverture] = useState(null);
//   const [image_profile, setImage_profile] = useState(null);
//   const [ProfileImage, setProfileImage] = useState(null);
//   const [isDesktop, setIsDesktop] = useState(window.innerWidth);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsDesktop(window.innerWidth >= 1024);
//     };

//     window.addEventListener("resize", handleResize);

//     // Clean up the event listener when the component unmounts
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);
//   const handleCoverUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage_profile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfileCover(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleProfileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setCouverture(file);

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfileImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Convert 'couverture' and 'image_profile' files to Base64
//     const convertFileToBase64 = (file) =>
//       new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => {
//           // Remove the 'data:/;base64,' prefix
//           const base64String = reader.result.split(",")[1];
//           resolve(base64String);
//         };
//         reader.onerror = (error) => reject(error);
//       });

//     const couvertureBase64 = await convertFileToBase64(couverture);
//     const imageProfileBase64 = await convertFileToBase64(image_profile);
//     const payload = {
//       name: UserName,
//       localisation: Localisation,
//       telephone: Telephone,
//       couverture: couvertureBase64,
//       image_profile: imageProfileBase64,
//     };

//     const response = await fetch(`/api/complet_profile/${state.auth.user.id}`, {
//       method: "PUT",
//       body: JSON.stringify(payload),
//       // body: formData,
//       headers: {
//         Authorization: `Bearer ${state.auth.access_token}`,
//         // 'Content-Type': "multipart/form-data",
//       },
//     });
//     const res = await response.json();
//     console.log(res);
//   };

//   return (
//     <div className="flex flex-col lg:flex-row w-full">
//       {/* Left side - Form */}
//       <CompletProfileForm
//         setImage_profile={setImage_profile}
//         setCouverture={setCouverture}
//         UserName={UserName}
//         Localisation={Localisation}
//         Telephone={Telephone}
//         handleSubmit={handleSubmit}
//         setUserName={setUserName}
//         setLocalisation={setLocalisation}
//         setTelephone={setTelephone}
//         handleCoverUpload={handleCoverUpload}
//         handleProfileUpload={handleProfileUpload}
//         ProfileCover={ProfileCover}
//         ProfileImage={ProfileImage}
//       />

//       {/* Right side - Preview (desktop only) */}
//       {isDesktop && (
//         <ProfilePreview
//           UserName={UserName}
//           Localisation={Localisation}
//           Telephone={Telephone}
//           ProfileCover={ProfileCover}
//           ProfileImage={ProfileImage}
//         />
//       )}
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CompletProfileForm from "./CompletProfileForm";
import ProfilePreview from "./ProfilePreview";
import { useNavigate } from "react-router-dom";

export default function CompletProfile() {
  const state = useSelector((state) => state);
  const [UserName, setUserName] = useState(state.auth.user.name);
  const [Telephone, setTelephone] = useState("");
  const [loading, setloading] = useState("");
  const [Localisation, setLocalisation] = useState("");
  const [ProfileCover, setProfileCover] = useState(null);
  const [couverture, setCouverture] = useState(null);
  const [image_profile, setImage_profile] = useState(null);
  const [ProfileImage, setProfileImage] = useState(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  // New state variables for additional fields
  const [workplace, setWorkplace] = useState("");
  const [relationship_status, setRelationshipStatus] = useState("");
  const [partner, setPartner] = useState("");
  const [job_title, setJobTitle] = useState("");
  const [date_of_birth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [website, setWebsite] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    // Initialize form fields with user data if available
    if (state.auth.user) {
      setTelephone(state.auth.user.telephone || "");
      setLocalisation(state.auth.user.localisation || "");
      setWorkplace(state.auth.user.workplace || "");
      setRelationshipStatus(state.auth.user.relationship_status || "");
      setPartner(state.auth.user.partner || "");
      setJobTitle(state.auth.user.job_title || "");
      setDateOfBirth(state.auth.user.date_of_birth || "");
      setGender(state.auth.user.gender || "");
      setWebsite(state.auth.user.website || "");
      
      // Handle image URLs if they exist
      if (state.auth.user.image_profile_url) {
        setProfileImage(state.auth.user.image_profile_url);
      }
      if (state.auth.user.couverture_url) {
        setProfileCover(state.auth.user.couverture_url);
      }
    }
  }, [state.auth.user]); 
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage_profile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileCover(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCouverture(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    // Convert 'couverture' and 'image_profile' files to Base64
    const convertFileToBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          // Remove the 'data:/;base64,' prefix
          const base64String = reader.result.split(",")[1];
          resolve(base64String);
        };
        reader.onerror = (error) => reject(error);
      });

    // Only convert files if they exist
    let couvertureBase64 = null;
    let imageProfileBase64 = null;

    if (couverture) {
      couvertureBase64 = await convertFileToBase64(couverture);
    }

    if (image_profile) {
      imageProfileBase64 = await convertFileToBase64(image_profile);
    }

    const payload = {
      name: UserName,
      localisation: Localisation,
      telephone: Telephone,
      couverture: couvertureBase64,
      image_profile: imageProfileBase64,
      // Add new fields to payload
      workplace,
      relationship_status,
      partner,
      job_title,
      date_of_birth,
      gender,
      website,
      phone_number: Telephone, // Assuming phone_number is the same as Telephone
    };

    try {
      const { default: api } = await import("@/lib/api");
      await api.put(`/api/complet_profile/${state.auth.user.id}`, payload);
      setloading(false); 
      navigate(`/profile/${state.auth.user.id}`);
    } catch (error) {
      console.error("Error completing profile:", error);
      setloading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full">
      {/* Left side - Form */}
      <CompletProfileForm
        loading={loading}
        setImage_profile={setImage_profile}
        setCouverture={setCouverture}
        UserName={UserName}
        Localisation={Localisation}
        Telephone={Telephone}
        handleSubmit={handleSubmit}
        setUserName={setUserName}
        setLocalisation={setLocalisation}
        setTelephone={setTelephone}
        handleCoverUpload={handleCoverUpload}
        handleProfileUpload={handleProfileUpload}
        ProfileCover={ProfileCover}
        ProfileImage={ProfileImage}
        // Pass new state variables and setters
        workplace={workplace}
        relationship_status={relationship_status}
        partner={partner}
        job_title={job_title}
        date_of_birth={date_of_birth}
        gender={gender}
        website={website}
        setWorkplace={setWorkplace}
        setRelationshipStatus={setRelationshipStatus}
        setPartner={setPartner}
        setJobTitle={setJobTitle}
        setDateOfBirth={setDateOfBirth}
        setGender={setGender}
        setWebsite={setWebsite}
      />

      {/* Right side - Preview (desktop only) */}
      {isDesktop && (
        <ProfilePreview
          UserName={UserName}
          Localisation={Localisation}
          Telephone={Telephone}
          ProfileCover={ProfileCover}
          ProfileImage={ProfileImage}
          // Pass new fields to preview component
          workplace={workplace}
          relationship_status={relationship_status}
          partner={partner}
          job_title={job_title}
          date_of_birth={date_of_birth}
          gender={gender}
          website={website}
        />
      )}
    </div>
  );
}
