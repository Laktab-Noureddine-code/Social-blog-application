import { useSelector } from "react-redux";
// import PageHeader from "./PageHeader";
// import PageAbout from "./PageAbout";
// import CurrentPagePosts from "./CurentPagePosts";
import ProfilePosts from "../../components/pages/profile/ProfilePosts";
import { useParams } from "react-router-dom";
import ProfileAbout from "./ProfileAbout";
import ProfileHeader from "./ProfileHeader";
function Profilepublication() {
  const state = useSelector((state) => state.profile);
  const { id } = useParams();
  console.log('hello world ',state)

  return (
    state.user.id && (
      <div className="md:min-w-full px-2 mx-auto pb-6 w-full min-h-screen">
        <div className="w-64"></div>
        <div className="flex flex-col">
          <div className="w-full">
            <ProfileHeader />
            <div className="flex w-full lg:flex-row flex-col justify-center md:px-2 mt-4 gap-4 ">
              <div className="lg:w-[45%] w-full">
                <ProfileAbout />
              </div>
              <ProfilePosts id={id} />
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Profilepublication;
