
import { useEffect, useState } from "react";
import { Button } from "@/shared/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { UserPlus, Search } from "lucide-react";
import { Input } from "@/shared/ui/input";
import { envoyerInvitation, GetAuthers } from "@/shared/helpers/invitationActions";
import { useDispatch, useSelector } from "react-redux";
import { removeAuhter, updateUserauthers } from "@/Redux/AmisSicie";
import SkeletonAmis from "@/shared/components/skeletons/SkeletonOthers";

export default function AutresPage() {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loding, setLoding] = useState(true);
  const authers = useSelector((state) => state.amis.authers);
  const dispatchEvent = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [invitedIds, setInvitedIds] = useState([]);

  // Reset authors when component mounts
  useEffect(() => {
    dispatchEvent(updateUserauthers([]));
  }, []);

  // Fetch authors when page changes
  useEffect(() => {
    if (!loading) {
      setLoading(true);
      GetAuthers(dispatchEvent, page, setLoding).finally(
        () => setLoading(false)
      );
    }
  }, [page, dispatchEvent]);

  // Scroll to load next page if bottom reached
  useEffect(() => {
    const handleScroll = () => {
      if (loading) return;
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  // Format and deduplicate authors
  useEffect(() => {
    const formatted = authers.map((item) => ({
      id: item.user.id,
      name: item.user.name,
      avatar: item.user.image_profile_url,
      location: item.user.localisation ?? "",
      mutualFriends: item.mutual_friends_count,
      uniqueKey: `${item.user.id}-${item.user.name}`, // safer unique key
    }));

    const uniqueUsers = formatted.filter(
      (user, index, self) => index === self.findIndex((u) => u.id === user.id)
    );

    setUsers(uniqueUsers);
  }, [authers]);

  // Filter and sort users
  const filteredUsers = users
    .filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Other Users</h1>
        <p className="text-muted-foreground">
          Discover new people to add
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for users..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
     {loding ? <SkeletonAmis/> : <div>
        {filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUsers.map((user) => (
              <div
                key={user.uniqueKey}
                className="border rounded-lg p-4 flex flex-col hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                    />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {user.location}
                    </p>
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between">
                  {user.mutualFriends > 0 && (
                    <p className="text-sm text-muted-foreground">
                      {user.mutualFriends} friend
                      {user.mutualFriends > 1 ? "s" : ""} in common
                    </p>
                  )}
                  <Button
                    variant={
                      invitedIds.includes(user.id) ? "outline" : "default"
                    }
                    size="sm"
                    className="ml-auto"
                    disabled={invitedIds.includes(user.id)}
                    onClick={() => {
                      envoyerInvitation(user.id, dispatchEvent);
                      dispatchEvent(removeAuhter(user.id));
                      setInvitedIds([...invitedIds, user.id]);
                    }}
                  >
                    {invitedIds.includes(user.id) ? (
                      "Invited"
                    ) : (
                      <>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Invite
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border rounded-lg bg-muted/20">
            <p className="text-muted-foreground">
              {searchQuery
                ? "No user matches your search."
                : "No users available."}
            </p>
          </div>
        )}
      </div>}
    </div>
  );
}
