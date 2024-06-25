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

export function NavBar() {
  return (
    <div className="bg-dark shadow-sm mb-2">
      <div className="row">
        <div className="col-11">
          <img
            src={
              "https://www.araquariev.com.br/wp-content/uploads/sites/445/2015/10/Logo-teste.jpg"
            }
            width="60"
            alt="Logo"
          />
        </div>
        <div className="col-1 pt-2">
          <button className="btn btn-success">Entrar</button>
        </div>
      </div>
    </div>
  );
}
