import { IPedido } from "@/commons/interfaces";
import PedidosService from "@/service/PedidosService";
import { useEffect, useState } from "react";

export function ListaDePedidos() {
  const [listaPedidos, setListaPedidos] = useState<IPedido[]>([]);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await PedidosService.pedidosPorUsuario(1);
      if (response.status === 200) {
        setListaPedidos(response.data);
      } else {
        setApiError("Falha ao carregar a lista de pedidos!");
      }
    } catch (error) {
      setApiError("Falha ao carregar a lista de pedidos!");
    }
  };

  return (
    <>
      <main className="container">
        {apiError ? (
          <div className="error">{apiError}</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Valor</th>
                <th>Data</th>
                <th>Forma de Pagamento</th>
                <th>Usuário</th>
                <th>Itens</th>
              </tr>
            </thead>
            <tbody>
              {listaPedidos.map((pedido) => (
                <PedidoRow key={pedido.id} pedido={pedido} />
              ))}
            </tbody>
          </table>
        )}
      </main>
    </>
  );
}

interface PedidoRowProps {
  pedido: IPedido;
}

const PedidoRow: React.FC<PedidoRowProps> = ({ pedido }) => {
  return (
    <tr>
      <td>{pedido.id}</td>
      <td>{pedido.valor.toFixed(2)}</td>
      <td>{new Date(pedido.data).toLocaleDateString()}</td>
      <td>{pedido.formaPagamento}</td>
      <td>
        {pedido.itensPedido.map((item) => (
          <div key={item.produto.idProduto}>
            {item.produto.nome} - {item.qtde}
          </div>
        ))}
      </td>
    </tr>
  );
};
