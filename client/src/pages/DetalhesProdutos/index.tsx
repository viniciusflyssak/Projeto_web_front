import { IProduto } from "@/commons/interfaces";
import { NavBar } from "@/components/NavBar";
import ProdutosService from "@/service/ProdutosService";
import { useEffect, useState } from "react";
import { Container, Row, Card, Button, Alert } from "react-bootstrap";

export function DetalhesProdutos() {
  const [produto, setProduto] = useState<IProduto>();
  const [apiError, setApiError] = useState("");


  useEffect(() => {
    carregarProduto();
  }, []);

  const obterIdProduto = (): string => {
    const urlAtual = window.location.href;
    const partes = urlAtual.split("/");
    const ultimoValor = partes[partes.length - 1];
    return ultimoValor;
  };

  const carregarProduto = async () => {
    try {
      const response = await ProdutosService.findOne(obterIdProduto());
      if (response.status === 200) {
        setProduto(response.data);
      } else {
        setApiError("Falha ao carregar o produto!");
      }
    } catch (error) {
      setApiError("Falha ao carregar o produto!");
    }
  };

  const adicionarAoCarrinho = (produto: IProduto) => {
    console.log(produto);
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
                onClick={() => adicionarAoCarrinho(produto!)}
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
