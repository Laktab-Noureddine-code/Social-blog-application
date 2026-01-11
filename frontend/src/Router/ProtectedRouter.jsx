import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRouter() {
   const { isAuthenticated, isLoading } = useSelector(state => state.auth);

   // Show nothing while checking authentication (cookie validation in progress)
   if (isLoading) {
     return (
       <div className="flex items-center justify-center h-screen">
         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
       </div>
     );
   }

   // If authenticated (valid session cookie), render protected routes
   // Otherwise redirect to login
   return isAuthenticated ? (
     <div>
       <Outlet />
     </div>
   ) : (
     <Navigate to="/login" />
   );
}

export default ProtectedRouter
