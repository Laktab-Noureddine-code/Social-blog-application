/* eslint-disable react/prop-types */

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const UpdatePageForm = ({
  PageName,
  location,
  phone,
  handleSubmit,
  setPageName,
  setlocation,
  setphone,
  description,
  category,
  website,
  email,
  setdescription,
  setcategory,
  setwebsite,
  setemail,
  loading,
}) => {
  return (
    <div className="bg-white top-0 w-full lg:w-[50%] p-6 space-y-6 border-r h-screen overflow-y-auto shadow-xl">
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
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Catégorie
            </label>
            <Input
              id="category"
              placeholder="Catégorie (ex: Business, Communauté)"
              value={category}
              name="category"
              onChange={(e) => setcategory(e.target.value)}
              className="w-full border rounded p-2"
            />
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

        <div className="pt-4">
          <Button
            type="submit"
            className={`w-full py-3 font-bold transform transition-all duration-200 ${
              PageName !== ""
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
          >
            {loading ? "modification en coure ..." : "Modifier la page"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePageForm;
