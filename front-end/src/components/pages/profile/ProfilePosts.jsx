import Posts from "../Publications/Posts"
import UserProfilePosts from "../Publications/UserProfilePosts"

function ProfilePosts({id}) {
  return (
    <div className="lg:w-[55%]">
      <UserProfilePosts id={id}/>
    </div>
  )
}

export default ProfilePosts
