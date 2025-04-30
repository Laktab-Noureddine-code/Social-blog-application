import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
    const { pathname } = useLocation();
    console.log(pathname);

  useEffect(() => {
    window.scrollTo(0, 0); // Reset scroll to top on route change
  }, [pathname]);

  return null;
}

export default ScrollToTop;
