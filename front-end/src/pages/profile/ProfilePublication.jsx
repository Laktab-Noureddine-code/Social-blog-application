import ProfileHeader from "../../components/pages/profile/ProfileHeader";
import ProfilePosts from "../../components/pages/profile/ProfilePosts";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ProfileAbout from "../../components/pages/profile/ProfileAbout";
import Photos_Vidos from "../../components/pages/profile/Photos_Vidos";
function ProfilePublication() {
  const { id } = useParams();
  // const state = useSelector(state=>state)
  const [userData, setUserData] = useState(null); // Start with null for loading
  const [showAllMedais, setShowAllMedais] = useState(false); // Start with null for loading
  const state = useSelector((state) => state); // All users from Redux
  const dispatchEvent = useDispatch();
  console.log(state.Profile);

  return (
    state.Profile.user && (
      <div className="md:min-w-full px-2 mx-auto pb-6 w-full min-h-screen">
        <div className="w-64"></div>
        {/* Main content area */}
        <div className="flex flex-col">
          <div className="w-full">
            <ProfileHeader user={state.Profile.user} />
            {!showAllMedais ? (
              <div className="flex w-full lg:flex-row flex-col justify-center md:px-2 mt-4 gap-4 overflow:hidden">
                <div className="lg:w-[45%] w-full">
                  <ProfileAbout
                    data={state.profile}
                    setShowAllMedais={() => setShowAllMedais((prev) => !prev)}
                    showAllMedais={showAllMedais}
                  />
                </div>
                <ProfilePosts id={id} />
              </div>
            ) : (
              <Photos_Vidos />
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default ProfilePublication;
