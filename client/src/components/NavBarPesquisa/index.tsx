import { ICategoria } from "@/commons/interfaces";
import CategoriasService from "@/service/CategoriasService";
import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";

interface NavBarProps {
  pesquisa: string;
  setPesquisa: (term: string) => void;
  categoriaSelecionada: ICategoria | null;
  setCategoriaSelecionada: (categoria: ICategoria | null) => void;
}

export function NavBarPesquisa({
  pesquisa,
  setPesquisa,
  categoriaSelecionada,
  setCategoriaSelecionada,
}: NavBarProps) {
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    carregarCategorias();
  }, []);

  const carregarCategorias = async () => {
    const response = await CategoriasService.findAll();
    if (response.status === 200) {
      setCategorias(response.data);
    }
  };

  const handleCategoriaSelect = (categoria: ICategoria) => {
    setCategoriaSelecionada(categoria);
  };

  return (
    <div className="bg-dark shadow-sm mb-2">
      <div className="container-fluid">
        <div className="row align-items-center px-1 ">
          <div className="col-2">
            <img
              src="https://www.araquariev.com.br/wp-content/uploads/sites/445/2015/10/Logo-teste.jpg"
              width="60"
              alt="Logo"
              onClick={() => navigate(`/`)}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="col-2">
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Categorias: {categoriaSelecionada ? categoriaSelecionada.nome : "Todas"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  key={0}
                  onClick={() => handleCategoriaSelect({ id: 0, nome: "Todas" })}
                >
                  Todas
                </Dropdown.Item>
                {categorias.map((categoria) => (
                  <Dropdown.Item
                    key={categoria.id}
                    onClick={() => handleCategoriaSelect(categoria)}
                  >
                    {categoria.nome}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="col-5">
            <input
              type="text"
              className="form-control"
              placeholder="Pesquisar"
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
            />
          </div>
          <div className="col-3 text-end">
            <button className="btn btn-success">Entrar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
