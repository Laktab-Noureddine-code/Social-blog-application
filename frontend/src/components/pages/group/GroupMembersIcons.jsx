import { Ellipsis } from "lucide-react"
import { Link } from "react-router-dom"

function GroupMembersIcons({group}) {
  return (
      <div className="flex">
          {
              group.members.slice(0, 18).map((member, index, array) => (
                  <Link to={`/users`} key={index} className="w-10 h-10 -ml-4  flex items-center relative justify-center border-3 border-white rounded-full bg-gray-300 overflow-hidden">
                      <img src={member.profileImage} loading="lazy" className={`${array.length === index + 1 && "grayscale-50"} w-full h-full object-cover ransition hover:grayscale-75`} />
                      {array.length === index + 1 && <Ellipsis className="absolute text-[300px] text-white" />}
                  </Link>
              ))
          }
      </div>
  )
}

export default GroupMembersIcons
