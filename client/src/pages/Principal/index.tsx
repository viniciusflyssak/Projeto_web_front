import { ICategoria, IProduto } from "@/commons/interfaces";
import CardProduto from "@/components/CardProduto";
import { NavBar } from "@/components/NavBar";
import ProdutosService from "@/service/ProdutosService";
import { useEffect, useState } from "react";

export function Principal() {
  const [listaProdutos, setListaProdutos] = useState<IProduto[]>([]);
  const [filteredData, setFilteredData] = useState<IProduto[]>([]);
  const [apiError, setApiError] = useState("");
  const [pesquisa, setPesquisa] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<ICategoria | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    let filtered = listaProdutos;
    if (pesquisa) {
      filtered = listaProdutos.filter((produto) =>
        produto.nome.toLowerCase().includes(pesquisa.toLowerCase())
      );
    }

    if (categoriaSelecionada) {
      filtered = listaProdutos.filter((produto) =>
        produto.categoria.id === categoriaSelecionada.id);
    }

    setFilteredData(filtered);
  }, [pesquisa, categoriaSelecionada, listaProdutos]);

  const loadData = async () => {
    try {
      const response = await ProdutosService.findAll();
      if (response.status === 200) {
        setListaProdutos(response.data);
        setFilteredData(response.data);
      } else {
        setApiError("Falha ao carregar a lista de produtos!");
      }
    } catch (error) {
      setApiError("Falha ao carregar a lista de produtos!");
    }
  };

  return (
    <>
      <main className="container">
        <NavBar pesquisa={pesquisa} setPesquisa={setPesquisa} categoriaSelecionada={categoriaSelecionada} setCategoriaSelecionada={setCategoriaSelecionada}/>
        <div className="row">
          {filteredData.map((produto) => (
            <CardProduto
              key={produto.idProduto}
              titulo={produto.nome}
              preco={produto.preco}
              imagem={produto.imagem}
            />
          ))}
        </div>
        {apiError && <p>{apiError}</p>}
      </main>
    </>
  );
}
