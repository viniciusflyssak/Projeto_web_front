import { IProduto } from "@/commons/interfaces";
import { adicionarAoCarrinho } from "@/commons/utils";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function CardProduto(produto: IProduto) {
  const navigate = useNavigate();
  const id = produto.idProduto;

  const clickAdicionar = (produto: IProduto) => {
    adicionarAoCarrinho(produto);
  };

  return (
    <div className="col-3">
      <Card style={{ width: "18rem" }} className="bg-light shadow-sm">
        <Card.Img
          className="bg-light shadow-sm"
          variant="top"
          src={produto.imagem}
          style={{ width: "18rem", height: "18rem" }}
        />
        <Card.Body>
          <Card.Title>{produto.nome}</Card.Title>
          <Card.Text>R$ {produto.preco} </Card.Text>
          <div className="row">
            <div className="col-6">
              <Button
                variant="primary"
                onClick={() => navigate(`/detalhesProdutos/${id}`)}
              >
                Visualizar descrição
              </Button>
            </div>
            <div className="col-6">
              <Button variant="success" onClick={() => clickAdicionar(produto)}>Adicionar ao carrinho</Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CardProduto;
