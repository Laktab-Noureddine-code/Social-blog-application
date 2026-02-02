import { useEffect, useState } from "react";
import { Button } from "@/shared/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { MessageSquare, UserMinus, Search } from "lucide-react";
import { Input } from "@/shared/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AnnulerAmis } from "@/shared/helpers/invitationActions";
import SkeletonOthers from "@/shared/components/skeletons/SkeletonOthers";
import { updateUserAbonnes, updateUserFriends } from "@/Redux/AmisSicie";
import { getInvitationsEnvoyees, getInvitationsRecues, SetIsLoadingInvitaion } from "@/Redux/InvitationSlice";
import api from "@/lib/api";


// Mock data - in a real app, this would come from an API

export default function AmisPage() {
  const [friends, setFriends] = useState([]);
  
  const [searchQuery, setSearchQuery] = useState("");
  const friends_state = useSelector(state => state.amis.friends);
  const user = useSelector(state => state.auth.user);
  const loding = useSelector((state) => state.invitation.loading);
  const dispatchEvent = useDispatch();

  useEffect(() => {
    setFriends(friends_state);
  }, [friends_state, dispatchEvent]);
  useEffect(() => {
    // dispatch(setIsLoading(true));
    const fetchData = async () => {
      if (!user.id) return;
      try {
        const response = await api.get(`/api/amis/${user.id}`);
        const userData = response.data;
        dispatchEvent(updateUserFriends(userData.tousAmis));
        dispatchEvent(getInvitationsEnvoyees(userData.utilisateursInvitesParMoi));
        dispatchEvent(getInvitationsRecues(userData.utilisateursQuiMInvitent));
        dispatchEvent(updateUserAbonnes(userData.tousAbonnes));
        dispatchEvent(SetIsLoadingInvitaion(false));
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchData();
  }, [dispatchEvent, user.id]);

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Friends</h1>
          <p className="text-muted-foreground">
            Manage your friends and interact with them
          </p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for a friend..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      {loding ? (
        <SkeletonOthers />
      ) : (
        <div>
          {friends.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFriends.map((friend) => (
                <div
                  key={friend.id}
                  className="border rounded-lg p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={friend.image_profile_url || "/placeholder.svg"}
                          alt={friend.name}
                        />
                        <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {friend.online && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{friend.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {friend.lastActive}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link to={"/chat"} variant="ghost" size="icon">
                      <MessageSquare className="h-5 w-5" />
                      <span className="sr-only">Send a message</span>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        AnnulerAmis(friend.id, dispatchEvent)
                      }
                    >
                      <UserMinus className="h-5 w-5 text-red-500" />
                      <span className="sr-only">{"Remove friend"}</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg bg-muted/20">
              <p className="text-muted-foreground">
                {searchQuery
                  ? "No friend matches your search."
                  : "You don't have any friends yet."}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
