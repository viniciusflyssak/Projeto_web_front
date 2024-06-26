import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function CardProduto(produto: {
  titulo: string;
  preco: number;
  imagem: string;
}) {
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
          <Card.Title>{produto.titulo}</Card.Title>
          <Card.Text>R$ {produto.preco} </Card.Text>
          <div className="row">
            <div className="col-6">
              <Button variant="primary" >Visualizar descrição</Button>
             
            </div>
            <div className="col-6">
              <Button variant="success">Adicionar ao carrinho</Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CardProduto;
