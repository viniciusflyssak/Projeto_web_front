import CategoryService from "@/service/CategoryService";
import Dropdown from 'react-bootstrap/Dropdown';

export function NavBar() {
  let categorias = [];

  const carregarCategorias = async () => {
    const response = await CategoryService.findAll();
    if (response.status === 200) {
      categorias = response.data;
    }
  };

  return (
    <div className="bg-dark shadow-sm mb-2">
      <div className="row">
        <div className="col-2">
          <img
            src={
              "https://www.araquariev.com.br/wp-content/uploads/sites/445/2015/10/Logo-teste.jpg"
            }
            width="60"
            alt="Logo"
          />
        </div>
        <div className="col-2 pt-2">
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Categorias
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Celular</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Console</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Informatica</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="col-6 pt-2">
          <input type="text" className="form-control" placeholder="Pesquisar" />
        </div>
        <div className="col-1 pt-2">
          <button className="btn btn-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="20"
              fill="currentColor"
              className="bi bi-search"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </button>
        </div>
        <div className="col-1 pt-2">
          <button className="btn btn-success">Entrar</button>
        </div>
      </div>
    </div>
  );
}
