import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";

function UpdateProfileForm() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [UserName, setUserName] = useState("");
  const [Telephone, setTelephone] = useState("");
  const [Localisation, setLocalisation] = useState("");
  const [workplace, setWorkplace] = useState("");
  const [relationship_status, setRelationshipStatus] = useState("");
  const [partner, setPartner] = useState("");
  const [job_title, setJobTitle] = useState("");
  const [date_of_birth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setUserName(user.name || "");
      setTelephone(user.telephone || "");
      setLocalisation(user.localisation || "");
      setWorkplace(user.workplace || "");
      setRelationshipStatus(user.relationship_status || "");
      setPartner(user.partner || "");
      setJobTitle(user.job_title || "");
      setDateOfBirth(user.date_of_birth || "");
      setGender(user.gender || "");
      setWebsite(user.website || "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: UserName,
      localisation: Localisation,
      telephone: Telephone,
      workplace,
      relationship_status,
      partner,
      job_title,
      date_of_birth,
      gender,
      website,
    };

    try {
      await api.patch(`/api/update/${user.id}`, payload);
      navigate(`/profile/${user.id}`);
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white top-0 w-full ld:w-[26%] p-6 space-y-6 border-r h-screen overflow-y-auto shadow-xl">
      <div>
        <h1 className="text-2xl font-bold mt-1">Complete Your Profile</h1>
      </div>

      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="font-semibold text-gray-600">
            {UserName?.charAt(0)?.toUpperCase() || "?"}
          </span>
        </div>
        <div className="font-semibold">{UserName}</div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm text-gray-500 mb-1 block">
            Personal Information
          </label>
          <Input
            placeholder="Full Name"
            value={UserName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Localisation"
            value={Localisation}
            onChange={(e) => setLocalisation(e.target.value)}
          />
          <Input
            placeholder="Phone"
            value={Telephone}
            onChange={(e) => setTelephone(e.target.value)}
          />
        </div>

        <Input
          placeholder="Website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="date"
            value={date_of_birth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full border rounded p-2 h-10 bg-white"
          >
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-500 mb-1 block">
            Professional Information
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Workplace"
              value={workplace}
              onChange={(e) => setWorkplace(e.target.value)}
            />
            <Input
              placeholder="Job Title"
              value={job_title}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-500 mb-1 block">
            Relationship Status
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              value={relationship_status}
              onChange={(e) => setRelationshipStatus(e.target.value)}
              className="w-full border rounded p-2 h-10 bg-white"
            >
              <option value="">Status</option>
              <option value="single">Single</option>
              <option value="in_relationship">In a relationship</option>
              <option value="engaged">Engaged</option>
              <option value="married">Married</option>
              <option value="complicated">{"It's complicated"}</option>
            </select>
            <Input
              placeholder="Partner"
              value={partner}
              onChange={(e) => setPartner(e.target.value)}
              disabled={
                relationship_status === "single" || relationship_status === ""
              }
            />
          </div>
        </div>

        <Button
          onClick={()=> navigate(-1)}
          type="button"
          
          className="w-[48%] py-2.5 font-bold bg-gray-200 text-black hover:bg-gray-300 mx-2"
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className={`w-[48%] py-2.5 font-bold mx-2 ${
            UserName
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-200 text-black hover:bg-gray-300"
          }`}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update"}
        </Button>
      </form>
    </div>
  );
}

export default UpdateProfileForm;
