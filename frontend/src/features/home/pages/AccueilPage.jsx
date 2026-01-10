import { Outlet } from "react-router-dom";
import UserDashboard from "./UserDashboard";

function AccueilPage() {
  return (
    <div className="flex min-h-screen relative">
      <div className="hidden lg:block w-[15%] max-[1000px]:hidden">
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
      <div className="h-screen sticky top-[83px] lg:w-[30%]  max-[1000px]:hidden">
        <UserDashboard />
      </div>
    </div>
  );
}

export default AccueilPage;
