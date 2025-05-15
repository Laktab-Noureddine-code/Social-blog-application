import { Outlet } from "react-router-dom";
import useAuthLoader from "../../hooks/useAuthLoader";

function AccueilPage() {
  useAuthLoader();
  return (
    <>
      <Outlet/>
    </>
  );
}

export default AccueilPage;
