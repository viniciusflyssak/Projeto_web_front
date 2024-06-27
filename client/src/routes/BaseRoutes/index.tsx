
import { Route, Routes } from "react-router-dom";
import { AuthenticatedRoutes } from "../AuthenticatedRoutes";
import { Principal } from "@/pages/Principal";
import { ListaDePedidos } from "@/pages/ListaDePedidos";
import { Entrar } from "@/pages/Entrar";
import { Cadastrar } from "@/pages/Cadastrar";
import { FinalizarCompra } from "@/pages/FinalizarCompra";

export function BaseRoutes() {
  return (
    <>
      <Routes>
        {/*Public routes */}
        <Route path="/" element={<Principal />} />
        <Route path="/principal" element={<Principal />} />
        <Route path="/entrar" element={<Entrar />} />
        <Route path="/cadastrar" element={<Cadastrar />} />
        <Route path="/finalizar" element={<FinalizarCompra/>} />
        <Route path="/listaDePedidos" element={<ListaDePedidos />}/> //TODO: Mover para rotas privadas

        {/*Private routes */}
        <Route element={<AuthenticatedRoutes />}>
        
        </Route>
      </Routes>
    </>
  );
}
