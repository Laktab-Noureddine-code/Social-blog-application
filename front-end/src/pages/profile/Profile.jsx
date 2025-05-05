import ProfileHeader from "../../components/pages/profile/ProfileHeader";
// import ProfileAbout from "../../components/pages/friends/ProfileAbout";
import ProfilePosts from "../../components/pages/profile/ProfilePosts";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import MyLoader from "../../components/loader/Loader";
import ProfileAbout from "../../components/pages/profile/ProfileAbout";

export default function Profile() {
    const { idUser } = useParams()
    const [userData, setUserData] = useState(null); // Start with null for loading
    const users = useSelector(state => state.user.users);// All users from Redux
    // Fetch specific user data when users are available
    useEffect(() => {
        if (users.length > 0) {
            const user = users.find(u => u.id === +idUser)
            if (user) {
                setUserData(user)
            }
        }
    }, [users, idUser])
    if (!userData) return (
        <MyLoader width="100%"/>)

    return (
        <div className="md:min-w-full px-2 mx-auto pb-6 w-full min-h-screen">
            <div className="w-64">
            </div>
            {/* Main content area */}
            <div className="flex flex-col">
                <div className="w-full">
                    <ProfileHeader user={userData} />
                    <div className="flex w-full lg:flex-row flex-col justify-center md:px-2 mt-4 gap-4">
                        <ProfileAbout />
                        <ProfilePosts />
                    </div>
                </div>
            </div>


        </div>
    );
}