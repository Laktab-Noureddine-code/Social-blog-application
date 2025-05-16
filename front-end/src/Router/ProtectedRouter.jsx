import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRouter() {
   const token = localStorage.getItem("access_token");

   return token ? <Outlet /> : <Navigate to="/auth/login" />;
}

export default ProtectedRouter
