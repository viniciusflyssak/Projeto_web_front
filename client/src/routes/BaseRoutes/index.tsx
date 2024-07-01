import { Route, Routes } from "react-router-dom";
import { Principal } from "@/pages/Principal";
import { ListaDePedidos } from "@/pages/ListaDePedidos";
import DetalhesProdutos from "@/pages/DetalhesProdutos";
import { AuthenticatedRoutes } from "../AuthenticatedRoutes";
import { Entrar } from "@/pages/Entrar";
import { Cadastrar } from "@/pages/Cadastrar";
import { FinalizarCompra } from "@/pages/FinalizarCompra";
import { Carrinho } from "@/pages/Carrinho";

export function BaseRoutes() {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Principal />} />
        <Route path="/principal" element={<Principal />} />
        <Route path="/entrar" element={<Entrar />} />
        <Route path="/cadastrar" element={<Cadastrar />} />
        <Route path="/detalhesProdutos/:id" element={<DetalhesProdutos />} />
        <Route path="/carrinho" element={<Carrinho />} />
        {/* Private routes */}
        <Route element={<AuthenticatedRoutes />}>
          {/* Adicione aqui suas rotas privadas */}
          <Route path="/listaDePedidos/:id" element={<ListaDePedidos />} />{" "}
          <Route path="/finalizar" element={<FinalizarCompra />} />
        </Route>
      </Routes>
    </>
  );
}
