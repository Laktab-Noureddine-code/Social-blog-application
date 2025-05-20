

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UpdateProfileForm() {
  const state = useSelector((state) => state);
    const [UserName, setUserName] = useState(state.auth.user.name);
    const [Telephone, setTelephone] = useState("");
    const [loading, setloading] = useState("");
    const [Localisation, setLocalisation] = useState("");
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
        setUserName(state.auth.user.name);
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
      }
    }, [state.auth.user]); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    const payload = {
      name: UserName,
      localisation: Localisation,
      telephone: Telephone,
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

    const response = await fetch(`/api/update/${state.auth.user.id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: {
        Authorization: `Bearer ${state.auth.access_token}`,
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();
    console.log(res);
    if (!response.ok) {
      setloading(false);
    } else {
      setloading(false);
      navigate(`/profile/${state.auth.user.id}`);
    }
  };

  return (
    <div className="bg-white top-0 w-full ld:w-[26%] p-6 space-y-6 border-r h-screen overflow-y-auto shadow-xl">
      <div>
        <h1 className="text-2xl font-bold mt-1">Complet Ton Profile</h1>
      </div>

      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="font-semibold text-gray-600">M</span>
        </div>
        <div>
          <div className="font-semibold">{state.auth.user}</div>
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
                <option value="complicated">{"C'est compliqué"}</option>
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
        <div className="w-full pt-4">
          <Button
            className={`w-full py-2.5 bg-gray-200 font-bold transform text-black hover:bg-gray-300 ${
              UserName !== "" ? "bg-blue-600 text-white hover:bg-blue-700" : ""
            }`}
          >
            {loading ? "en cour de complet ..." : 'Completer'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UpdateProfileForm;
