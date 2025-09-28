import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const token = localStorage.getItem("token");

  // Se não tiver token, manda para o login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Se tiver token, renderiza a rota normal
  return <Outlet />;
}
