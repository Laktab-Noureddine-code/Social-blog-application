import { useSelector } from 'react-redux';
import { UserCog, Crown, Users } from 'lucide-react';
import { userProfile } from "@/shared/helpers/helper";

function Memebers() {
  const currentGroup = useSelector(state => state.groups.currentGroup);
  const members = currentGroup?.members || [];
  
  // Separate members by role
  const creator = members.find(member => member.id === currentGroup?.created_by);
  const admins = members.filter(member => 
    member.pivot.role === 'admin' && member.id !== currentGroup?.created_by
  );
  const regularMembers = members.filter(member => 
    member.pivot.role === 'member' && member.pivot.status === 'accepted'
  );

  const totalMembers = members.filter(m => m.pivot.status == "accepted").length

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <Users className="h-5 w-5 text-gray-600" />
          Membres · {totalMembers}
        </h2>
        
        {/* Creator Section */}
        {creator && (
          <div className="mb-6">
            <h3 className="text-md font-medium text-gray-700 flex items-center gap-2 mb-3">
              <Crown className="h-4 w-4 text-amber-500" />
              Créateur
            </h3>
            <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="h-10 w-10 mr-3 overflow-hidden rounded-full border-2">
                <img 
                  src={userProfile(creator.image_profile_url )} 
                  alt={creator.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium">{creator.name}</p>
                <p className="text-xs text-gray-500">{creator.email}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Admins Section */}
        {admins.length > 0 && (
          <div className="mb-6">
            <h3 className="text-md font-medium text-gray-700 flex items-center gap-2 mb-3">
              <UserCog className="h-4 w-4 text-blue-500" />
              Administrateurs · {admins.length}
            </h3>
            <div className="space-y-1">
              {admins.map(admin => (
                <div key={admin.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="h-10 w-10 mr-3 overflow-hidden rounded-full border-2 border-blue-300">
                    <img 
                      src={userProfile(admin.image_profile_url)} 
                      alt={admin.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{admin.name}</p>
                    <p className="text-xs text-gray-500">{admin.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Regular Members Section */}
        {regularMembers.length > 0 && (
          <div>
            <h3 className="text-md font-medium text-gray-700 flex items-center gap-2 mb-3">
              <Users className="h-4 w-4 text-gray-500" />
              Membres · {regularMembers.length}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {regularMembers.map(member => (
                <div key={member.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="h-10 w-10 mr-3 overflow-hidden rounded-full border-2 border-gray-200">
                    <img 
                      src={userProfile(member.image_profile_url)} 
                      alt={member.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-xs text-gray-500">{member.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Memebers;
