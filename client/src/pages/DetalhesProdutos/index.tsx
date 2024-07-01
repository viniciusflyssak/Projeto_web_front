import { IProduto } from "@/commons/interfaces";
import { adicionarAoCarrinho } from "@/commons/utils";
import { NavBar } from "@/components/NavBar";
import ProdutosService from "@/service/ProdutosService";
import { useEffect, useState } from "react";
import { Container, Row, Card, Button, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";

export function DetalhesProdutos() {
  const [produto, setProduto] = useState<IProduto>();
  const [apiError, setApiError] = useState("");
  const params = useParams();

  useEffect(() => {
    carregarProduto();
  }, []);

  const carregarProduto = async () => {
    try {
      const response = await ProdutosService.findOne(params.id || "");
      if (response.status === 200) {
        setProduto(response.data);
      } else {
        setApiError("Falha ao carregar o produto!");
      }
    } catch (error) {
      setApiError("Falha ao carregar o produto!");
    }
  };

  const clickAdicionar = (produto: IProduto) => {
    adicionarAoCarrinho(produto);
  };

  return (
    <div>
      <NavBar />
      <Container className="mt-3">
        {apiError ? (
          <Alert variant="danger">{apiError}</Alert>
        ) : (
          <Row>
            <div className="col-6">
              <Card>
                <Card.Img
                  src={produto?.imagem}
                  alt={produto?.nome}
                  style={{ width: "100%", height: "auto" }}
                />
              </Card>
            </div>
            <div className="col-6">
              <Card body style={{ height: "60%" }}>
                <Card.Title as="h1">{produto?.nome}</Card.Title>
                <Card.Text>{produto?.descricao}</Card.Text>
              </Card>
              <Card body className="mt-2">
                <Card.Title as="h3">R$ {produto?.preco}</Card.Title>
              </Card>
              <Button
                variant="success"
                onClick={() => clickAdicionar(produto!)}
                className="mt-2 col-12"
              >
                Adicionar ao carrinho
              </Button>
            </div>
          </Row>
        )}
      </Container>
    </div>
  );
}

export default DetalhesProdutos;
