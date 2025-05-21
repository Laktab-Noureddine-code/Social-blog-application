/* eslint-disable react/prop-types */
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Popover from "./popover";
import Declaration from "./ActionsPublication/Diclaration";
import { useState } from "react";
import SavePublication from "./ActionsPublication/SavePublication";
import ToggleFollowButton from "./ActionsPublication/ToogleAbooner";
import HideButton from "./ActionsPublication/HidePublication";
import SupprimerButton from "./ActionsPublication/SupprimerPublication";
import DeclareButton from "./ActionsPublication/DeclareButton";
import CaseFriend from "./ActionsPublication/CaseFriend";
import { useSelector } from "react-redux";

export default function MenuBublication({ post }) {
  const [show, setShow] = useState(false);
  const state = useSelector((state) => state);
  return (
    <div className="flex items-center justify-center p-2  ">
      <Popover
        position="left"
        trigger={
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full h-3 w-3 p-0"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        }
      >
        <div className="border border-gray-200 absolute min-h-[300px] max-h-[500px] right-[280px] top-[2px] z-20 bg-white w-[300px] overflow-y-auto">
          <div className="p-3 flex items-center gap-3"></div>
          {
            post.user_id === state.auth.user.id && 
          <div className="p-3 flex items-center gap-3">
            <SupprimerButton post={post} />
          </div>}
          <div className="p-3 flex items-center gap-3 w-full">
            <button className="w-full">
              <DeclareButton post={post} setShow={() => setShow(true)} />
            </button>
            {show && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                <div className="">
                  <Declaration
                    post_id={post.id}
                    onClose={() => setShow(false)}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="p-3 flex items-center gap-3">
            <SavePublication post={post} />
          </div>
          {post.page_id ? (
            <div className="p-3 flex items-center gap-3">
              <ToggleFollowButton post={post} />
            </div>
          ) : (
            <div className="p-3 flex items-center gap-3">
              <CaseFriend Id={post.id} />
            </div>
          )}
          {
          window.location.pathname === "/accueil" &&
            // Works regardless of domain or port
          <div className="p-3 flex items-center gap-3">
            <HideButton post={post} />
          </div>
          }
        </div>
      </Popover>
    </div>
  );
}
