import { addMoreAuthers, addNewFriend, removeFriend } from "../../Redux/AmisSicie";
import { addNewInvitationEnvoyee, removeInvitationEnvoyee, removeInvitationRecue } from "../../Redux/InvitationSlice";


export async function GetAuthers(access_token, dispatchEvent, page = 1,setIsloding,loding) {
  console.log('hello main');
  // setIsloding(false);
  console.log(loding);
  const response = await fetch(`/api/amis/authers?page=${page}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const data = await response.json();

  if (data.data) {
    dispatchEvent(addMoreAuthers(data.data)); // ajoute les nouveaux auteurs dans Redux
  }
  if(response.ok) setIsloding(false);

  return {
    current_page: data.current_page,
    last_page: data.last_page,
    total: data.total,
  };
}


const envoyerInvitation = async (userId, access_token, dispatchEvent) => {
  try {
    const response = await fetch(`/api/invitations/${userId}/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!response.ok) throw new Error("Erreur serveur");

    const data = await response.json();
    // addNewInvitationEnvoyee
    // dispatchEvent({ type: "add_new_invitationsEnvoyees", payload: data });
    dispatchEvent(addNewInvitationEnvoyee(data));
  } catch (error) {
    console.error("Erreur lors de l'envoi :", error);
  }
};

const annulerInvitation = async (userId, access_token, dispatchEvent) => {
  try {
    const response = await fetch(`/api/invitations/${userId}/cancel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!response.ok) throw new Error("Erreur serveur");

    const data = await response.json();
    dispatchEvent(removeInvitationEnvoyee(data));
  } catch (error) {
    console.error("Erreur lors de l'annulation :", error);
  }
};

const accepterInvitation = async (userId, access_token, dispatchEvent) => {
  try {
    const response = await fetch(`/api/invitations/${userId}/accept`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (!response.ok) throw new Error("Erreur serveur");

    const data = await response.json();
    dispatchEvent(removeInvitationRecue(data));
    dispatchEvent(addNewFriend(data));
  } catch (error) {
    console.error("Erreur lors de l'acceptation :", error);
  }
};

const refuserInvitation = async (userId, access_token, dispatchEvent) => {
  try {
     const response = await fetch(
       `/api/invitations/${userId}/refuse`,
       {
         method: "POST",
         headers: {
           Authorization: `Bearer ${access_token}`,
         },
       }
     );
    if (!response.ok) throw new Error("Erreur serveur");

    const data = await response.json();
    dispatchEvent(removeInvitationRecue(data));
  } catch (error) {
    console.error("Erreur lors du refus de l'invitation :", error);
  }
};

const AnnulerAmis = async (amie_id, access_token, dispatchEvent) => {
  const response = await fetch(`/api/amis/${amie_id}/remove`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  const resData = await response.json();
  dispatchEvent(removeFriend(resData));
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
