import { useEffect, useState } from "react";
import { Button } from "@/shared/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Check, X, Search } from "lucide-react";
import { Input } from "@/shared/ui/input";
import { useDispatch, useSelector } from "react-redux";
import {
  accepterInvitation,
  refuserInvitation,
} from "@/shared/helpers/invitationActions";
import SkeletonInviter from "@/shared/components/skeletons/SkeletonInviter";

// Mock data - in a real app, this would come from an API


export default function InvitationsPage() {
  const [invitations, setInvitations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatchEvent = useDispatch();
  const Invites = useSelector((state) => state.invitation.invitationsRecues);
  const loading = useSelector((state) => state.invitation.loading);
  useEffect(() => {
    setInvitations(Invites);
  }, [Invites, dispatchEvent]);

  const filteredInvitations = invitations.filter((invitation) =>
    invitation.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Invitations</h1>
          <p className="text-muted-foreground">
            People who have invited you
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
      {loading ? (
        <SkeletonInviter />
      ) : (
        <div>
          {filteredInvitations.length > 0 ? (
            <div className="space-y-4">
              {filteredInvitations.map((invitation) => (
                <div
                  key={invitation.id}
                  className="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={invitation.avatar || "/placeholder.svg"}
                        alt={invitation.name}
                      />
                      <AvatarFallback>
                        {invitation.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{invitation.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {invitation.date}
                      </p>
                      {invitation.mutualFriends > 0 && (
                        <p className="text-xs text-muted-foreground">
                          {invitation.mutualFriends} friend
                          {invitation.mutualFriends > 1 ? "s" : ""} in common
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 self-end sm:self-center">
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() =>
                        accepterInvitation(
                          invitation.id,
                          dispatchEvent
                        )
                      }
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Accept
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600"
                      onClick={() =>
                        refuserInvitation(
                          invitation.id,
                          dispatchEvent
                        )
                      }
                    >
                      <X className="h-4 w-4 mr-2" />
                      Decline
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
                  : "You have no pending invitations."}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
