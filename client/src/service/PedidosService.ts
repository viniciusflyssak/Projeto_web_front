import { IPedido } from "@/commons/interfaces";
import { api } from "@/lib/axios";

const URL = "/pedidos";

const postPedido = async (pedido: IPedido): Promise<any> => {
  let response;
  try {
    response = await api.post("/pedidos", pedido);
  } catch (error: any) {
    response = error.response;
  }
  return response;
};

const pedidosPorUsuario = async (id: number) => {
  let response;
  try {
    response = await api.get(URL + '/PedidosPorUsuario?usuario=' + id);
  } catch (error: any) {
    response = error.response;
  }
  return response;
};

const PedidosService = { pedidosPorUsuario , postPedido};
export default PedidosService;