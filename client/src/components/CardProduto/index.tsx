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
          style={{ width: "18rem", height: "18rem"}}
        />
        <Card.Body>
          <Card.Title>{produto.titulo}</Card.Title>
          <Card.Text>R$ {produto.preco} </Card.Text>
          <div className="row">
            <div className="col-6">
              <Button variant="success">Comprar</Button>
            </div>
            <div className="col-6">
              <Button variant="primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-cart"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                </svg>
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CardProduto;
