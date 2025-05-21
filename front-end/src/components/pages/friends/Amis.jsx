import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, UserMinus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AnnulerAmis } from "../../utils/invitationActions";


// Mock data - in a real app, this would come from an API
const mockFriends = [
  {
    id: 1,
    name: "Sophie Martin",
    avatar: "/placeholder.svg?height=40&width=40",
    online: true,
    lastActive: "En ligne",
  },
  {
    id: 2,
    name: "Thomas Dubois",
    avatar: "/placeholder.svg?height=40&width=40",
    online: false,
    lastActive: "Il y a 2 heures",
  },
  {
    id: 3,
    name: "Emma Bernard",
    avatar: "/placeholder.svg?height=40&width=40",
    online: true,
    lastActive: "En ligne",
  },
  {
    id: 4,
    name: "Lucas Petit",
    avatar: "/placeholder.svg?height=40&width=40",
    online: false,
    lastActive: "Il y a 1 jour",
  },
  {
    id: 5,
    name: "Chloé Leroy",
    avatar: "/placeholder.svg?height=40&width=40",
    online: false,
    lastActive: "Il y a 3 jours",
  },
];

export default function AmisPage() {
  const [friends, setFriends] = useState(mockFriends);
    const [searchQuery, setSearchQuery] = useState("");
    const friends_state = useSelector(state => state.amis.friends);
    const access_Token = useSelector(state => state.auth.access_token);
    const dispatchEvent = useDispatch();

    useEffect(() => {
      setFriends(friends_state);
    }, [friends_state, dispatchEvent]);


  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Mes Amis</h1>
          <p className="text-muted-foreground">
            Gérez vos amis et interagissez avec eux
          </p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un ami..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

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
                  <span className="sr-only">Envoyer un message</span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    AnnulerAmis(friend.id, access_Token, dispatchEvent)
                  }
                >
                  <UserMinus className="h-5 w-5 text-red-500" />
                  <span className="sr-only">{"Supprimer l'ami"}</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border rounded-lg bg-muted/20">
          <p className="text-muted-foreground">
            {searchQuery
              ? "Aucun ami ne correspond à votre recherche."
              : "Vous n'avez pas encore d'amis."}
          </p>
        </div>
      )}
    </div>
  );
}
