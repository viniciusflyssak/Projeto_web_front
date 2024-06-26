import { Route, Routes } from "react-router-dom";
import { Principal } from "@/pages/Principal";
import { LoginPage } from "@/pages/LoginPage";
import { UserSignupPage } from "@/pages/UserSignupPage";
import { ListaDePedidos } from "@/pages/ListaDePedidos";
import DetalhesProdutos from "@/pages/DetalhesProdutos";
import { AuthenticatedRoutes } from "../AuthenticatedRoutes";

export function BaseRoutes() {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Principal />} />
        <Route path="/principal" element={<Principal />} />
        <Route path="/entrar" element={<LoginPage />} />
        <Route path="/cadastrar" element={<UserSignupPage />} />
        <Route path="/detalhesProdutos/:id" element={<DetalhesProdutos />} />
        <Route path="/listaDePedidos" element={<ListaDePedidos />} />{" "}
        {/* TODO: Mover para rotas privadas */}
        {/* Private routes */}
        <Route element={<AuthenticatedRoutes />}>
          {/* Adicione aqui suas rotas privadas */}
        </Route>
      </Routes>
    </>
  );
}
