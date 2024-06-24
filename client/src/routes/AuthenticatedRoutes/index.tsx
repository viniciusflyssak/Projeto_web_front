import AuthService from "@/service/AuthService";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export function AuthenticatedRoutes() {
  const location = useLocation();
  const isAuthenticated = AuthService.isAuthenticated();
  return isAuthenticated ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/principal" state={{ from: location }} replace />
  );
}
