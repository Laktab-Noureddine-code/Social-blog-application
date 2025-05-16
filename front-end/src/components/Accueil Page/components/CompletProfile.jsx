import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import CompletProfileForm from "./CompletProfileForm";
import ProfilePreview from "./ProfilePreview";

export default function CompletProfile() {
  const state = useSelector((state) => state);
  const [UserName, setUserName] = useState(state.auth.user.name);
  const [Telephone, setTelephone] = useState('');
  const [Localisation, setLocalisation] = useState('');
  const [ProfileCover, setProfileCover] = useState(null);
  const [couverture, setCouverture] = useState(null);
  const [image_profile, setImage_profile] = useState(null);
  const [ProfileImage, setProfileImage] = useState(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth);

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
      setCouverture(file)
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
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

    const couvertureBase64 = await convertFileToBase64(couverture);
    const imageProfileBase64 = await convertFileToBase64(image_profile);
    const payload = {
      name: UserName,
      localisation: Localisation,
      telephone: Telephone,
      couverture: couvertureBase64,
      image_profile: imageProfileBase64,
    };

    const response = await fetch(`/api/complet_profile/${state.auth.user.id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
      // body: formData,
      headers: {
        Authorization: `Bearer ${state.auth.access_token}`,
        // 'Content-Type': "multipart/form-data",
      },
    });
    const res = await response.json();
  
  };

  return (
    <div className="flex flex-col lg:flex-row w-full">
      {/* Left side - Form */}
      <CompletProfileForm
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
      />

      {/* Right side - Preview (desktop only) */}
      {isDesktop && (
        <ProfilePreview
          UserName={UserName}
          Localisation={Localisation}
          Telephone={Telephone}
          ProfileCover={ProfileCover}
          ProfileImage={ProfileImage}
        />
      )}
    </div>
  );
}
