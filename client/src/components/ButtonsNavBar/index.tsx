import { IUsuario } from "@/commons/interfaces";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function ButtonsNavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);
  const navigate = useNavigate();

  const sair = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setIsLoggedIn(false);
    navigate(`/`);
  };

  return (
    <div>
      {!isLoggedIn ? (
        <Button
          className="btn btn-success me-2"
          onClick={() => navigate(`/cadastrar`)}
        >
          Cadastrar
        </Button>
      ) : (
        <Button className="btn btn-primary me-2" href="/listaDePedidos">
          Meus pedidos
        </Button>
      )}

      {!isLoggedIn ? (
        <Button className="btn btn-primary" href="/entrar">
          Entrar
        </Button>
      ) : (
        <Button className="btn btn-danger" onClick={sair}>
          Sair
        </Button>
      )}
    </div>
  );
}
