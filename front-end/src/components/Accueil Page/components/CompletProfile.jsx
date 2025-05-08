import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import CompletProfileForm from "./CompletProfileForm";
import ProfilePreview from "./ProfilePreview";

export default function CompletProfile() {
  const state = useSelector((state) => state);
  const [UserName, setUserName] = useState(state.user.name);
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
      // setCouverture(file)
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
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append('name',UserName);
  //   formData.append("localisation", Localisation);
  //   formData.append("telephone", Telephone);
  //   formData.append("couverture", couverture);
  //   formData.append("image_profile", image_profile);
  //   const form = {
  //     name: UserName,
  //     localisation: Localisation,
  //     telephone: Telephone,
  //     couverture: couverture,
  //     image_profile: image_profile,
  //   };
  //   // console.log(form);
  //   const response = await fetch(`/api/complet_profile/${state.user.id}`, {
  //     method: "POST",
  //     body: JSON.stringify(form),
  //     // body: formData,
  //     headers: {
  //       Authorization: `Bearer ${state.access_token}`,
  //       // 'Content-Type': "multipart/form-data",
  //     },
  //   });
  //   const res = await response.json();
  //   console.log(res);
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  const formData = new FormData();
  formData.append('name', UserName);
  formData.append('localisation', Localisation);
  formData.append('telephone', Telephone);
  
  // Append files correctly - use [0] to get the first file
  if (couverture && couverture.length > 0) {
    formData.append('couverture', couverture[0]);
  }
  
  if (image_profile && image_profile.length > 0) {
    formData.append('image_profile', image_profile[0]);
  }

  try {
    const response = await fetch(`/api/complet_profile/${state.user.id}`, {
      method: "POST",
      body: formData,  // Send as FormData
      headers: {
        Authorization:` Bearer ${state.access_token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const res = await response.json();
    console.log('Success:', res);
    // Optionally show success message or redirect
  } catch (error) {
    console.error('Error:', error);
    // Handle error (show error message to user)
  }
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
