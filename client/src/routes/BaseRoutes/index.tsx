import { LoginPage } from "@/pages/LoginPage";
import { UserSignupPage } from "@/pages/UserSignupPage";
import { Route, Routes } from "react-router-dom";
import { AuthenticatedRoutes } from "../AuthenticatedRoutes";
import { Principal } from "@/pages/Principal";

export function BaseRoutes() {
  return (
    <>
      <Routes>
        {/*Public routes */}
        <Route path="/" element={<Principal />} />
        <Route path="/principal" element={<Principal />} />
        <Route path="/entrar" element={<LoginPage />} />
        <Route path="/cadastrar" element={<UserSignupPage />} />

        {/*Private routes */}
        <Route element={<AuthenticatedRoutes />}>
        
        </Route>
      </Routes>
    </>
  );
}
