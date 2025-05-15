
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
    dispatchEvent({ type: "add_new_invitationsEnvoyees", payload: data });
    console.log("Invitation envoyée", data);
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
    dispatchEvent({ type: "remove_invitationsEnvoyees", payload: data });
    console.log("Invitation annulée", data);
  } catch (error) {
    console.error("Erreur lors de l'annulation :", error);
  }
};

const accepterInvitation = async (userId, access_token, dispatchEvent) => {
  try {
    const response = await fetch(`/api/invitations/${userId}/accept`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!response.ok) throw new Error("Erreur serveur");

    const data = await response.json();
    // console.log(data)
    dispatchEvent({ type: "remove_invitationsRecues", payload: data });
    dispatchEvent({ type: "add_new_friends", payload: data });
    // console.log("Invitation acceptée", data);
  } catch (error) {
    console.error("Erreur lors de l'acceptation :", error);
  }
};

const refuserInvitation = async (userId, access_token, dispatchEvent) => {
  try {
    const response = await fetch(`/api/invitations/${userId}/refuse`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!response.ok) throw new Error("Erreur serveur");

    const data = await response.json();
    dispatchEvent({ type: "remove_invitationsRecues", payload: data });
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
  dispatchEvent({ type: "remove_friend", payload: resData });
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

  const filledFields = fields.filter((field) => user[field]);
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
