

// export default CreatePageForm;




import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { useState } from "react";

const CreatePageForm = ({
  PageName,
  location,
  phone,
  handleSubmit,
  setPageName,
  setlocation,
  setphone,
  Pagecouverture,
  Page_image_profile,
  description,
  category,
  website,
  email,
  setdescription,
  setcategory,
  setwebsite,
  setemail,
  handleProfileUpload,
  handleCoverUpload,
  loading,
}) => {
  const [selected, setSelected] = useState(category || "");
  const [customCategory, setCustomCategory] = useState(
    category && !["Sport", "Tech", "Mode", "Musique"].includes(category)
      ? category
      : ""
  );

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelected(value);
    if (value !== "Autre") {
      setCustomCategory("");
      setcategory(value);
    } else {
      setcategory("");
    }
  };

  const handleCustomInputChange = (e) => {
    const value = e.target.value;
    setCustomCategory(value);
    setcategory(value);
  };

  return (
    <div className="bg-white w-full lg:w-[50%] p-6 space-y-6 border-r h-screen overflow-y-auto shadow-xl sticky top-20">
      <div className="border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Compléter votre profil
        </h1>
        <p className="text-gray-500 mt-1">
          Remplissez les informations pour créer votre page
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
        encType="multipart/form-data"
      >
        {/* Basic Information Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
            Informations de base
          </h2>

          <div>
            <label
              htmlFor="pageName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nom de la page
            </label>
            <Input
              id="pageName"
              placeholder="Nom Complet"
              value={PageName}
              name="name"
              onChange={(e) => setPageName(e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block mb-2 font-semibold text-gray-700"
            >
              Catégorie
            </label>
            <select
              id="category"
              value={selected}
              onChange={handleSelectChange}
              className="border rounded p-2 w-full mb-2"
            >
              <option value="">-- Choisir une catégorie --</option>
              <option value="Sport">Sport</option>
              <option value="Tech">Tech</option>
              <option value="Mode">Mode</option>
              <option value="Musique">Musique</option>
              <option value="Autre">Autre</option>
            </select>
            {selected === "Autre" && (
              <input
                type="text"
                placeholder="Saisissez une catégorie"
                value={customCategory}
                onChange={handleCustomInputChange}
                className="border rounded p-2 w-full"
              />
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              placeholder="Description de votre page"
              value={description}
              name="description"
              onChange={(e) => setdescription(e.target.value)}
              className="w-full border rounded p-2 min-h-[100px] resize-y"
            />
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
            Coordonnées
          </h2>

          <div className="flex gap-4 lg:flex-col">
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Téléphone
              </label>
              <Input
                id="phone"
                placeholder="Téléphone"
                value={phone}
                name="phone"
                onChange={(e) => setphone(e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <Input
                id="email"
                placeholder="Email"
                value={email}
                name="email"
                type="email"
                onChange={(e) => setemail(e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="website"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Site web
            </label>
            <Input
              id="website"
              placeholder="Site web (ex: https://example.com)"
              value={website}
              name="website"
              onChange={(e) => setwebsite(e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label
              htmlFor="localisation"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Localisation
            </label>
            <Input
              id="localisation"
              placeholder="Localisation"
              value={location}
              name="localisation"
              onChange={(e) => setlocation(e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>
        </div>

        {/* Media Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
            Médias
          </h2>

          <div>
            <label
              htmlFor="coverPhoto"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Photo de couverture
            </label>
            <input
              id="coverPhoto"
              type="file"
              name="couverture"
              onChange={handleCoverUpload}
              accept="image/*"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
            {Pagecouverture && (
              <div className="mt-2">
                <img
                  src={Pagecouverture || "/placeholder.svg"}
                  alt="Cover preview"
                  className="h-32 w-full rounded-md object-cover"
                />
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="profilePhoto"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Photo de profil
            </label>
            <input
              id="profilePhoto"
              type="file"
              onChange={handleProfileUpload}
              name="image_profile"
              accept="image/*"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
            {Page_image_profile && (
              <div className="mt-2 flex justify-center">
                <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src={Page_image_profile || "/placeholder.svg"}
                    alt="Profile preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            className={`w-full py-3 font-bold transform transition-all duration-200 ${
              PageName !== ""
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
          >
            {!loading ? "Créer la page" : "Création en cours..."}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePageForm;
