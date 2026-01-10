/* eslint-disable react/prop-types */
import UserProfilePosts from "@/features/posts/components/UserProfilePosts"

function ProfilePosts({id}) {
  return (
    <div className="lg:w-[55%] overflow-x-hidden">
      <UserProfilePosts id={id}/>
    </div>
  )
}

export default ProfilePosts
