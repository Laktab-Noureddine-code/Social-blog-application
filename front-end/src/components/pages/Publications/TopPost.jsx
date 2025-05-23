/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */



import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Images, Link2, MapPin, SmilePlus } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CreatePost from "./CreatePost";
import { useSelector } from "react-redux";
import { useState } from "react";
import Unknown from "../../Accueil Page/components/Unknown";

function TopPost({id_page, type}) {
  const state = useSelector(state => state.auth)
  const [open, setOpen] = useState();
  return (
    <Card className="mb-4 p-4">
      <Sheet open={open} onOpenChange={setOpen}>
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="w-10 h-10">
              {state.user.image_profile_url ? (
                <img
                  src={state.user.image_profile_url}
                  alt="Your profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <Unknown />
              )}
            </Avatar>
            <SheetTrigger asChild>
              <input
                type="text"
                placeholder="What's on your mind?"
                className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 text-sm focus:outline-none cursor-pointer"
              />
            </SheetTrigger>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  type="button"
                  className="text-gray-500"
                >
                  <Images className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  type="button"
                  className="text-gray-500"
                >
                  <Link2 className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  type="button"
                  className="text-gray-500 hidden sm:flex"
                >
                  <MapPin className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  type="button"
                  className="text-gray-500 hidden sm:flex"
                >
                  <SmilePlus className="h-5 w-5" />
                </Button>
              </SheetTrigger>
            </div>
            <SheetTrigger asChild>
              <Button
                size="sm"
                type="button"
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4"
              >
                Post
              </Button>
            </SheetTrigger>
          </div>
        </div>
        <SheetContent
          side="top"
          className="!p-0 flex justify-center items-center h-screen bg-transparent max-w-[500px] m-auto"
        >
          <div className="md:p-10">
            <CreatePost onOpenChange={setOpen} id_page={id_page} type={type} />
          </div>
        </SheetContent>
      </Sheet>
    </Card>
  );
}
export default TopPost;
