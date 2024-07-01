import { IPedido, IUsuario } from "@/commons/interfaces";
import { NavBar } from "@/components/NavBar";
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function Carrinho() {
  const [pedido, setPedido] = useState<IPedido>();
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const pedidoString = localStorage.getItem("pedido");
      const pedidoObj: IPedido = pedidoString ? JSON.parse(pedidoString) : null;
      setPedido(pedidoObj);
    } catch (error) {
      setApiError("Falha ao carregar carrinho!");
    }
  };

  const finalizarClick = () => {
    const usuario = localStorage.getItem("usuario");
    const usuarioObj: IUsuario = usuario ? JSON.parse(usuario) : null;
    if (usuarioObj) {
      navigate(`/finalizar`);
    } else {
      navigate(`/entrar`);
    }
  }

  return (
    <>
      <NavBar />
      <main className="container">
        <div className="row">
          <Card style={{ width: "100%" }} className="bg-light shadow-sm mt-2">
            <Card.Body>
              <Card.Text style={{ fontSize: "1.3rem" }}>
                <strong>Itens do pedido:</strong>
              </Card.Text>
              <div className="row">
                {pedido?.itensPedido.map((item) => (
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
                        {(item.preco * item.qtde).toFixed(2).replace(".", ",")}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              </div>
              <Card.Text className="text-end" style={{ fontSize: "1.3rem" }}>
                <strong>
                  Valor total: R$ {pedido?.valor.toFixed(2).replace(".", ",")}
                </strong>
              </Card.Text>
              <div className="col-12 text-end pt-2 ms-0">
                <Button className="btn-success" onClick={finalizarClick}>
                  <h3>Finalizar compra</h3>
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </main>
    </>
  );
}
