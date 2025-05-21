/* eslint-disable react/prop-types */

import { EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useDispatch, useSelector } from "react-redux";
import { removeHide } from "../../../../Redux/PostsSilce";


export function HiddenPost({ post }) {
    const dispatchEvent = useDispatch();
    const state = useSelector((state) => state.auth);
  const handleUnhide = () => { 
      console.log(post.id)
        const fetchData = async () => {
            const response = await fetch(`/api/hide/${post.id}`, {
              method: "delete",
              headers: {
                Authorization: `Bearer ${state.access_token}`,
              },
            });
          const res = await response.json();
            dispatchEvent(removeHide({ idPost: post.id, response: res }));
        };
        fetchData();
    }
  return (
    <Card className="bg-gray-100 p-3 my-5">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
          <EyeOff className="h-4 w-4 text-gray-500" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-600">
            <span className="font-medium">{"Vous avez masqué ce message"}</span>
          </p>
          <p className="text-xs text-gray-500">
            {"Vous ne verrez pas ce message car vous l'avez masqué."}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-gray-500 hover:text-gray-700"
          onClick={handleUnhide}
        >
          <EyeOff className="h-3 w-3 mr-1" />
          Afficher
        </Button>
      </div>
    </Card>
  );
}
