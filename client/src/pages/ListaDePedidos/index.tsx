import { IPedido, IUsuario } from "@/commons/interfaces";
import { NavBar } from "@/components/NavBar";
import PedidosService from "@/service/PedidosService";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";

export function ListaDePedidos() {
  const [listaPedidos, setListaPedidos] = useState<IPedido[]>([]);
  const [apiError, setApiError] = useState("");


  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const usuario = localStorage.getItem("usuario");
      const usuarioObj: IUsuario = usuario ? JSON.parse(usuario) : null;
      const response = await PedidosService.pedidosPorUsuario(usuarioObj.id || 0);
      if (response.status === 200) {
        setListaPedidos(response.data);
      } else {
        setApiError("Falha ao carregar a lista de pedidos!");
      }
    } catch (error) {
      setApiError("Falha ao carregar a lista de pedidos!");
    }
  };

  const retornaNomeFormaPagamento = (formaPagamento: FormaPgtoEnum) => {
    switch (formaPagamento) {
      case 0:
        return "Boleto";
      case 1:
        return "Cartão de crédito";
      case 2:
        return "Cartão de débito";
      case 3:
        return "Pix";
      default:
        return "Forma de pagamento não identificada";
    }
  };

  return (
    <>
      <NavBar />
      <main className="container">
        <div className="row">
          {listaPedidos.map((pedido) => (
            <Card style={{ width: "100%" }} className="bg-light shadow-sm mt-2">
              <Card.Body>
                <Card.Title>
                  {new Date(pedido.data.replace("-", "/")).toLocaleDateString(
                    "pt-BR"
                  )}
                </Card.Title>
                <Card.Text style={{ fontSize: "1.3rem" }}>
                  <strong>Itens do pedido:</strong>
                </Card.Text>
                <div className="row">
                  {pedido.itensPedido.map((item) => (
                    <Card style={{ width: "30%" }} className="me-2 mb-2">
                      <Card.Body>
                        <Card.Img
                          variant="top"
                          src={item.produto.imagem}
                          style={{ width: "30%" }}
                        />
                        <Card.Title>{item.produto.nome}</Card.Title>
                        <Card.Text>Quantidade: {item.qtde}</Card.Text>
                        <Card.Text>
                          Valor unitário: R${" "}
                          {item.preco.toFixed(2).replace(".", ",")}
                        </Card.Text>
                        <Card.Text>
                          Valor total: R${" "}
                          {(item.preco * item.qtde)
                            .toFixed(2)
                            .replace(".", ",")}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
                <Card.Text className="text-end" style={{ fontSize: "1.3rem" }}>
                  <strong>Forma de pagamento: {retornaNomeFormaPagamento(pedido.formaPagamento)}</strong>
                </Card.Text>
                <Card.Text className="text-end" style={{ fontSize: "1.3rem" }}>
                  <strong>
                    Valor total: R$ {pedido.valor.toFixed(2).replace(".", ",")}
                  </strong>
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
}
