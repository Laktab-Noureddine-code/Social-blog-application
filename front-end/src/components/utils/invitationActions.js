import { addNewFriend, removeFriend } from "../../Redux/AmisSicie";
import { addNewInvitationEnvoyee, removeInvitationEnvoyee, removeInvitationRecue } from "../../Redux/InvitationSlice";

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
    console.log("Invitation annulée", data);
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
    // console.log("Invitation refusée", data);
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
  // console.log(resData);
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
  ];
  console.log("getProfileCompletion",user);

  const filledFields = fields.filter((field) => user[field] );
  // console.log(filledFields);
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
