import { useEffect, useState } from "react";
import { Button } from "@/shared/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { X, RefreshCw, Search } from "lucide-react";
import { Input } from "@/shared/ui/input";
import { Badge } from "@/shared/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { annulerInvitation } from "@/shared/helpers/invitationActions";
import SkeletonInviter from "@/shared/components/skeletons/SkeletonInviter";
//annulerInvitation

export default function MesInvitesPage() {
    const [invites, setInvites] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const dispatchEvent = useDispatch()
  const Ts = useSelector((state) => state.invitation);
  const Loading = Ts.loading;
    const mesInvites = useSelector(
      (state) => state.invitation.invitationsEnvoyees
    );
    useEffect(() => {
      setInvites(mesInvites);
      // console.log("mesInvites", mesInvites);
    }, [mesInvites, dispatchEvent]);
  

  const filteredInvites = invites.filter((invite) =>
    invite.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const resendInvite = (id) => {
    // In a real app, this would call an API to resend the invitation
    alert(
      `Invitation resent to ${
        invites.find((invite) => invite.id === id)?.name
      }`
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Invites</h1>
          <p className="text-muted-foreground">
            People you have invited
          </p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for an invitation..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      {Loading ? <SkeletonInviter/> : 
        <div>

          {filteredInvites.length > 0 ? (
            <div className="space-y-4">
              {filteredInvites.map((invite) => (
                <div
                  key={invite.id}
                  className="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={invite.image_profile_url || "/placeholder.svg"}
                        alt={invite.name}
                      />
                      <AvatarFallback>{invite.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{invite.name}</p>
                        <Badge
                          variant="outline"
                          className="text-yellow-600 bg-yellow-50"
                        >
                          Pending
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {invite.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 self-end sm:self-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => resendInvite(invite.id)}
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Resend
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600"
                      onClick={() =>
                        annulerInvitation(invite.id, dispatchEvent)
                      }
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg bg-muted/20">
              <p className="text-muted-foreground">
                {searchQuery
                  ? "No invitation matches your search."
                  : "You haven't sent any invitations."}
              </p>
            </div>
          )}
        </div>}
    </div>
  );
}
