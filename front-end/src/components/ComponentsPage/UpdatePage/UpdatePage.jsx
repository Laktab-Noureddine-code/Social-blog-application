

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PagePreview from "../PagePreview";
import UpdatePageForm from "./UpdarePageForm";
import { useParams } from "react-router-dom";

export default function UpdatePage() {
  const state = useSelector((state) => state);
  const [PageName, setPageName] = useState(state.auth.user.name);
  const [category, setcategory] = useState("");
  const [website, setwebsite] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [location, setlocation] = useState("");
  const [description, setdescription] = useState("");
  const [loading, setLoading] = useState(false);

  const [PagecouvertureFile, setPageCouvertureFile] = useState(null); // le fichier brut
  const [PagecouverturePreview, setPageCouverturePreview] = useState(null); // base64 pour affichage

  const [PageImageProfileFile, setPageImageProfileFile] = useState(null); // le fichier brut
  const [PageImageProfilePreview, setPageImageProfilePreview] = useState(null); // base64 pour affichage

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
   const { id } = useParams();
   useEffect(() => {
     const fetchData = async () => {
       const response = await fetch(`/api/page/${id}`, {
         headers: {
           "Content-Type": "application/json",
           Authorization: `Bearer ${state.auth.access_token}`,
         },
       });
       const res = await response.json();
       if (response.ok) {
         
         console.log('hello',res)
         setPageName(res.page.name);
         setdescription(res.page.description);
         setcategory(res.page.category);
         setwebsite(res.page.website);
         setemail(res.page.email);
         setphone(res.page.phone);
         setlocation(res.page.location);
         setPageCouverturePreview(res.page.Pagecouverture);
         setPageImageProfilePreview(res.page.Page_image_profile);
       }
     };
     fetchData();
   }, [id, state.auth.access_token]);

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
    setLoading(true);

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

      const response = await fetch(`/api/update-page`, {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {
          Authorization: `Bearer ${state.auth.access_token}`,
          "Content-Type": "application/json",
        },
      });

      const res = await response.json();
      if (response.ok) {
        setLoading(false);
      } else {
        setLoading(false);
      }
      console.log(res);
    } catch (error) {
      console.error("Error creating page:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full">
      <UpdatePageForm
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
        loading={loading}
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
