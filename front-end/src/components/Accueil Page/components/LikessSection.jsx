/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import "../../../style/globale.css";

function LikesSection({ postId, toggleSHowLikes, access_token, SetPosts }) {
  const [UersLikes, setUersLikes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const respons = await fetch(`/api/likes/users/${postId}`, {
        method: "GET",
        // body: JSON.stringify({ id: postId }),
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      const res = await respons.json();
        setUersLikes(res);
        SetPosts(res);
    };
    fetchData();
  }, [postId]);

  // Scroll to the bottom of the comments list when a new comment is added
  // useEffect(() => {
  //   commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [comments]);

  // Disable body scrolling when the comment section is open
  // useEffect(() => {
  //   if (comments.length > 0) {
  //     document.body.style.overflow = "hidden"; // Disable scrolling
  //   } else {
  //     document.body.style.overflow = "auto"; // Enable scrolling
  //   }
  //   // Clean up the effect when the component unmounts
  //   return () => {
  //     document.body.style.overflow = "auto"; // Ensure scrolling is enabled when the component is unmounted
  //   };
  // }, [comments]);

  return (
    <div className="h-screen fixed bg-black/85 dark:bg-gray-800/8 w-full top-0 left-0 z-30 flex justify-center py-2 items-center">
      <div className="bg-[#28242c] dark:bg-gray-50 w-full max-w-2xl mx-auto sm:px-0 py-5 max-h-[500px] rounded-md relative">
        {/* Close Button */}
        <div className="h-10 w-full bg-[#28242c] flex justify-end pr-5 border-b-1 border-white">
          <button type="button" className="z-20" onClick={toggleSHowLikes}>
            <X
              size={30}
              color="white"
              className="bg-gray-600 rounded-full p-2 cursor-pointer"
            />
          </button>
        </div>
        {/* Comments List (Scrollable with transparent bg and custom scrollbar) */}
        <div className="w-full overflow-y-auto max-h-[400px] pb-16 bg-transparent custom-scrollbar">
          <div className="p-5 relative">
            {UersLikes &&
              UersLikes.length > 0 &&
              UersLikes.map((like, index) => (
                <div key={index} className="flex gap-2 mb-3 items-center">
                  <Avatar className="w-8 h-8">
                    {/* <img src="/api/placeholder/32/32" alt={user.author} /> */}
                    <img
                      src={`/images/img${
                        Math.floor(Math.random() * 12) + 1
                      }.jpg`}
                      alt={like.user.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </Avatar>
                  <div className="p-2 rounded-lg w-[90%] flex justify-between items-center">
                    <div className="font-semibold text-xs text-white">{like.user.name}</div>
                    <div className="text-sm">
                      <button className="rounded-md bg-gray-700 text-white text-bold p-2">Ajouter Amis</button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LikesSection;
