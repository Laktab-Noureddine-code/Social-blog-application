// import { useEffect, useState } from "react";

// import { useSelector } from "react-redux";
// import CompletProfileForm from "./CompletProfileForm";
// import CreatePageForm from "./CreatePageForm";
// import PagePreview from "./PagePreview";

// export default function CreatePage() {
//   const state = useSelector((state) => state);
//   const [PageName, setPageName] = useState(state.auth.user.name);
//   const [category, setcategory] = useState('');
//   const [website, setwebsite] = useState('');
//   const [email, setemail] = useState('');
//   const [phone, setphone] = useState('');
//   const [location, setlocation] = useState('');
//   const [description, setdescription] = useState('');
//   const [Pagecouverture, setPageCouverture] = useState(null);
//   const [Page_image_profile, setPage_Image_profile] = useState(null);
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
//       setPage_Image_profile(file);
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
//       setPageCouverture(file)
      
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfileImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Convert 'Pagecouverture' and 'Page_image_profile' files to Base64
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

//     const PagecouvertureBase64 = await convertFileToBase64(Pagecouverture);
//     const imageProfileBase64 = await convertFileToBase64(Page_image_profile);
//     const payload = {
//       name: PageName,
//       description: description,
//       category: category,
//       website: website,
//       email: email,
//       phone: phone,
//       location: location,
//       Pagecouverture: PagecouvertureBase64,
//       Page_image_profile: imageProfileBase64,
//     };

//     const response = await fetch(`/api/createPage/${state.auth.user.id}`, {
//       method: "PUT",
//       body: JSON.stringify(payload),
//       // body: formData,
//       headers: {
//         Authorization: `Bearer ${state.auth.access_token}`,
//         // 'Content-Type': "multipart/form-data",
//       },
//     });
//     const res = await response.json();
  
//   };

//   return (
//     <div className="flex flex-col lg:flex-row w-full">
//       {/* Left side - Form */}
//       <CreatePageForm
//         sePage_Image_profile={setPage_Image_profile}
//         setPageCouverture={setPageCouverture}
//         PageName={PageName}
//         description={description}
//         category={category}
//         website={website}
//         email={email}
//         phone={phone}
//         location={location}
//         handleSubmit={handleSubmit}
//         setPageName={setPageName}
//         setdescription={setdescription}
//         setcategory={setcategory}
//         setwebsite={setwebsite}
//         setemail={setemail}
//         setphone={setphone}
//         setlocation={setlocation}
//         handleCoverUpload={handleCoverUpload}
//         handleProfileUpload={handleProfileUpload}
//         Pagecouverture={Pagecouverture}
//         Page_image_profile={Page_image_profile}
//       />
//       {/* Right side - Preview (desktop only) */}
//       {isDesktop && (
//         <PagePreview
//           PageName={PageName}
//           description={description}
//           category={category}
//           website={website}
//           email={email}
//           phone={phone}
//           location={location}
//           Pagecouverture={Pagecouverture}
//           Page_image_profile={Page_image_profile}
//         />
//       )}
//     </div>
//   );
// }




// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import CreatePageForm from "./CreatePageForm";
// import PagePreview from "./PagePreview";

// export default function CreatePage() {
//   const state = useSelector((state) => state);
//   const [PageName, setPageName] = useState(state.auth.user.name);
//   const [category, setcategory] = useState("");
//   const [website, setwebsite] = useState("");
//   const [email, setemail] = useState("");
//   const [phone, setphone] = useState("");
//   const [location, setlocation] = useState("");
//   const [description, setdescription] = useState("");
//   const [Pagecouverture, setPageCouverture] = useState(null);
//   const [Page_image_profile, setPage_Image_profile] = useState(null);
//   const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 124);
//   // const [ProfileCover, setProfileCover] = useState(null);
//   // const [ProfileImage, setProfileImage] = useState(null);
//   // const [Nom_de_page, setNom_de_page] = useState("");
//   // const [Description_de_page, setDescription_de_page] = useState("");
//   // const [PagecouvertureFile, setPageCouvertureFile] = useState(null);
//   // const [Page_image_profileFile, setPage_image_profileFile] = useState(null);
//   // const [Category, setCategory] = useState("");

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
//       setPageCouverture(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPageCouverture(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleProfileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // setPage_Image_profile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPage_Image_profile(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Convert 'Pagecouverture' and 'Page_image_profile' files to Base64
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

//     try {
//       let PagecouvertureBase64 = null;
//       let imageProfileBase64 = null;

//       if (Pagecouverture) {
//         PagecouvertureBase64 = await convertFileToBase64(Pagecouverture);
//       }

//       if (Page_image_profile) {
//         imageProfileBase64 = await convertFileToBase64(Page_image_profile);
//       }

//       const payload = {
//         name: PageName,
//         description: description,
//         category: category,
//         website: website,
//         email: email,
//         phone: phone,
//         location: location,
//         Pagecouverture: PagecouvertureBase64,
//         Page_image_profile: imageProfileBase64,
//       };

//       // const response = await fetch(`/api/create-page`, {
//       //   method: "PUT",
//       //   body: JSON.stringify(payload),
//       //   headers: {
//       //     Authorization: `Bearer ${state.auth.access_token}`,
//       //     "Content-Type": "application/json",
//       //   },
//       // });
//       // const res = await response.json();
//       // console.log(res);
//       console.log(payload)
//     } catch (error) {
//       console.error("Error creating page:", error);
//     }
//   };

//   return (
//     <div className="flex flex-col lg:flex-row w-full">
//       {/* Left side - Form */}
//       <CreatePageForm
//         PageName={PageName}
//         description={description}
//         category={category}
//         website={website}
//         email={email}
//         phone={phone}
//         location={location}
//         handleSubmit={handleSubmit}
//         setPageName={setPageName}
//         setdescription={setdescription}
//         setcategory={setcategory}
//         setwebsite={setwebsite}
//         setemail={setemail}
//         setphone={setphone}
//         setlocation={setlocation}
//         handleCoverUpload={handleCoverUpload}
//         handleProfileUpload={handleProfileUpload}
//         Pagecouverture={Pagecouverture}
//         Page_image_profile={Page_image_profile}
//       />
//       {/* Right side - Preview (desktop only) */}
//       {isDesktop && (
//         <PagePreview
//           PageName={PageName}
//           description={description}
//           category={category}
//           website={website}
//           email={email}
//           phone={phone}
//           location={location}
//           Pagecouverture={Pagecouverture}
//           Page_image_profile={Page_image_profile}
//         />
//       )}
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CreatePageForm from "./CreatePageForm";
import PagePreview from "./PagePreview";

export default function CreatePage() {
  const state = useSelector((state) => state);
  const [PageName, setPageName] = useState();
  const [category, setcategory] = useState("");
  const [website, setwebsite] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [location, setlocation] = useState("");
  const [description, setdescription] = useState("");

  const [PagecouvertureFile, setPageCouvertureFile] = useState(null); // le fichier brut
  const [PagecouverturePreview, setPageCouverturePreview] = useState(null); // base64 pour affichage

  const [PageImageProfileFile, setPageImageProfileFile] = useState(null); // le fichier brut
  const [PageImageProfilePreview, setPageImageProfilePreview] = useState(null); // base64 pour affichage

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPageCouvertureFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPageCouverturePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPageImageProfileFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPageImageProfilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const convertFileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result.split(",")[1]; // remove prefix
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let PagecouvertureBase64 = null;
      let imageProfileBase64 = null;

      if (PagecouvertureFile) {
        PagecouvertureBase64 = await convertFileToBase64(PagecouvertureFile);
      }

      if (PageImageProfileFile) {
        imageProfileBase64 = await convertFileToBase64(PageImageProfileFile);
      }

      const payload = {
        name: PageName,
        description,
        category,
        website,
        email,
        phone,
        location,
        Pagecouverture: PagecouvertureBase64,
        Page_image_profile: imageProfileBase64,
      };

      const response = await fetch(`/api/create-page`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          Authorization: `Bearer ${state.auth.access_token}`,
          "Content-Type": "application/json",
        },
      });

      const res = await response.json();
      console.log(res);
    } catch (error) {
      console.error("Error creating page:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full">
      <CreatePageForm
        PageName={PageName}
        description={description}
        category={category}
        website={website}
        email={email}
        phone={phone}
        location={location}
        handleSubmit={handleSubmit}
        setPageName={setPageName}
        setdescription={setdescription}
        setcategory={setcategory}
        setwebsite={setwebsite}
        setemail={setemail}
        setphone={setphone}
        setlocation={setlocation}
        handleCoverUpload={handleCoverUpload}
        handleProfileUpload={handleProfileUpload}
        Pagecouverture={PagecouverturePreview}
        Page_image_profile={PageImageProfilePreview}
      />

      {isDesktop && (
        <PagePreview
          PageName={PageName}
          description={description}
          category={category}
          website={website}
          email={email}
          phone={phone}
          location={location}
          Pagecouverture={PagecouverturePreview}
          Page_image_profile={PageImageProfilePreview}
        />
      )}
    </div>
  );
}
