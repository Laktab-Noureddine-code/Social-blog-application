import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRouter() {
   const token = localStorage.getItem("access_token");

   return token ? (
     <div>
       <Outlet />
     </div>
   ) : (
     <Navigate to="/auth/se-connecter" />
   );
}

export default ProtectedRouter
