import { ICategoria } from "@/commons/interfaces";
import CategoriasService from "@/service/CategoriasService";
import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";

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
    <div className="bg-dark shadow-sm mb-2" style={{ width: "100%" }}>
      <div className="row pe-0">
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
        <div className="col-5 pt-2">
          <input
            type="text"
            className="form-control"
            placeholder="Pesquisar"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
          />
        </div>
        <div className="text-end col-3 pt-2 pe-4">
          <button className="btn btn-success">Entrar</button>
        </div>
      </div>
    </div>
  );
}
