import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute({allowedRoles}: any) {
  const token = localStorage.getItem("access_token");
  const userRole = localStorage.getItem("user_role");

  if (!token) {
    return <Navigate to="/login" replace />;  
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/colaboradores" replace />;
  }
  return <Outlet />;
}