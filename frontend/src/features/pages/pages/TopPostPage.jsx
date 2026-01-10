/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */



import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/shared/ui/sheet";
import { useSelector } from "react-redux";
import { useState } from "react";
import CreatePost from "@/features/posts/components/CreatePost";
import { SquarePen } from "lucide-react";

function TopPostPage({id_page, type}) {
  const state = useSelector(state => state.auth)
  const [open, setOpen] = useState();
  return (
    <Card className="mb-4 p-4">
      <Sheet open={open} onOpenChange={setOpen}>
          <div className="flex justify-between items-center w-full">
            <SheetTrigger asChild>
              <Button
                size="sm"
                type="button"
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-md p-6 w-full md:text-xl"
              >
                Cree une publication <SquarePen />
              </Button>
            </SheetTrigger>
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
export default TopPostPage;
