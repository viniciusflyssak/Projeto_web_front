import { api } from "@/lib/axios";

const URL = "/pedidos";

const pedidosPorUsuario = async (id: number) => {
  let response;
  try {
    response = await api.get(URL);
  } catch (error: any) {
    response = error.response;
  }
  return response;
};

const PedidosService = { pedidosPorUsuario };
export default PedidosService;