import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";


import Navbar from "@/shared/components/layout/NavBar";
import Sidebar from "@/shared/components/layout/Sidebar";
import ExpandableSearch from "@/shared/components/layout/SearchOverlay";
import ScrollToTop from "./ScrolToTp";
import ProtectedRouter from "./ProtectedRouter";
import { useDispatch, useSelector } from "react-redux";


export default function Layout() {
  const location = useLocation();
  const scrollRef = useRef(null);
  const isLoading = useSelector(state => state.auth?.isLoading);
  const dispatchEvent = useDispatch();
  
  // useEffect(() => {
  //   if (scrollRef.current) {
  //     scrollRef.current.scrollTop = 0; // Scroll to top on route change
  //   }
  // }, [location.pathname]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      <div className="sticky top-0 left-0 right-0 bottom-0 z-30">
        <Navbar setIsMobileOpen={setIsMobileOpen} />
      </div>
      <div className="fixed top-[70px] left-0 z-10">
        <Sidebar
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />
      </div>
      <div className="block sm:hidden mt-3">
        <ExpandableSearch />
      </div>
      <div className="mt-[30px] md:ml-[250px] md:pr-[30px]">
        {isLoading ? (
          <div>loading</div>
        ) : (
          <div className="">
            {/* <ScrollToTop /> */}
            <ProtectedRouter />
          </div>
        )}
      </div>
    </>
  );
}



