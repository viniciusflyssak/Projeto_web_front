import { useNavigate } from "react-router-dom";

export function NavBar() {
  const navigate = useNavigate();
  return (
    <div className="bg-dark shadow-sm mb-2 d-flex align-items-center justify-content-between px-3">
      <img
        src="https://www.araquariev.com.br/wp-content/uploads/sites/445/2015/10/Logo-teste.jpg"
        width="60"
        alt="Logo"
        onClick={() => navigate(`/`)}
        style={{ cursor: "pointer" }}
      />
      <div>
        <button
          className="btn btn-success me-1"
          onClick={() => navigate(`/cadastrar`)}
        >
          Cadastrar
        </button>
        <button className="btn btn-success" onClick={() => navigate(`/entrar`)}>
          Entrar
        </button>
      </div>
    </div>
  );
}
