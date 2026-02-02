/* eslint-disable react/prop-types */

import { EyeOff } from "lucide-react"
import { Button } from "@/shared/ui/button"
import { Card } from "@/shared/ui/card"
import { useDispatch, useSelector } from "react-redux";
import { removeHide } from "@/Redux/PostsSilce";
import api from "@/lib/api";


export function HiddenPost({ post }) {
    const dispatchEvent = useDispatch();
    const state = useSelector((state) => state.auth);
  const handleUnhide = async () => {
    try {
      const response = await api.delete(`/api/hide/${post.id}`);
      dispatchEvent(removeHide({ idPost: post.id, response: response.data }));
    } catch (error) {
      console.error("Unhide error:", error);
    }
  }
  return (
    <Card className="bg-gray-100 p-3 my-5">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
          <EyeOff className="h-4 w-4 text-gray-500" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-600">
            <span className="font-medium">{"You have hidden this post"}</span>
          </p>
          <p className="text-xs text-gray-500">
            {"You won't see this post because you've hidden it."}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-gray-500 hover:text-gray-700"
          onClick={handleUnhide}
        >
          <EyeOff className="h-3 w-3 mr-1" />
          Show
        </Button>
      </div>
    </Card>
  );
}
