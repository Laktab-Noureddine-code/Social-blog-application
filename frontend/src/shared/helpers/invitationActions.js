import { addMoreAuthers, addNewFriend, removeFriend } from "@/Redux/AmisSicie";
import { addNewInvitationEnvoyee, removeInvitationEnvoyee, removeInvitationRecue } from "@/Redux/InvitationSlice";
import api from "@/lib/api";

// NOTE: These functions no longer need access_token parameter - cookies handle auth automatically
export async function GetAuthers(dispatchEvent, page = 1, setIsloding) {
  try {
    const response = await api.get(`/api/amis/authers?page=${page}`);
    const data = response.data;

    if (data.data) {
      dispatchEvent(addMoreAuthers(data.data));
    }
    setIsloding(false);

    return {
      current_page: data.current_page,
      last_page: data.last_page,
      total: data.total,
    };
  } catch (error) {
    console.error("Error fetching authors:", error);
    setIsloding(false);
    return { current_page: 1, last_page: 1, total: 0 };
  }
}

const envoyerInvitation = async (userId, dispatchEvent) => {
  try {
    const response = await api.post(`/api/invitations/${userId}/send`);
    dispatchEvent(addNewInvitationEnvoyee(response.data));
  } catch (error) {
    console.error("Error sending:", error);
  }
};

const annulerInvitation = async (userId, dispatchEvent) => {
  try {
    const response = await api.post(`/api/invitations/${userId}/cancel`);
    dispatchEvent(removeInvitationEnvoyee(response.data));
  } catch (error) {
    console.error("Error cancelling:", error);
  }
};

const accepterInvitation = async (userId, dispatchEvent) => {
  try {
    const response = await api.post(`/api/invitations/${userId}/accept`);
    dispatchEvent(removeInvitationRecue(response.data));
    dispatchEvent(addNewFriend(response.data));
  } catch (error) {
    console.error("Error accepting:", error);
  }
};

const refuserInvitation = async (userId, dispatchEvent) => {
  try {
    const response = await api.post(`/api/invitations/${userId}/refuse`);
    dispatchEvent(removeInvitationRecue(response.data));
  } catch (error) {
    console.error("Error rejecting invitation:", error);
  }
};

const AnnulerAmis = async (amie_id, dispatchEvent) => {
  try {
    const response = await api.post(`/api/amis/${amie_id}/remove`);
    dispatchEvent(removeFriend(response.data));
  } catch (error) {
    console.error("Error removing friend:", error);
  }
};
function getProfileCompletion(user) {
  if (!user) return 0;

  const fields = [
    "name",
    "email",
    "telephone",
    "localisation",
    "image_profile_url",
    "couverture_url",
    "email_verified_at",
    "workplace", // Added
    "relationship_status", // Added (values: single, in_a_relationship, married, complicated)
    "partner", // Added
    "job_title", // Added
    "date_of_birth", // Added
    "gender", // Added (values: male, female, other)
    "website", // Added
  ];

  const filledFields = fields.filter((field) => user[field] );
  const completion = Math.round((filledFields.length / fields.length) * 100);

  return completion;
}


export {
  refuserInvitation,
  accepterInvitation,
  envoyerInvitation,
  annulerInvitation,
  AnnulerAmis,
  getProfileCompletion,
};
