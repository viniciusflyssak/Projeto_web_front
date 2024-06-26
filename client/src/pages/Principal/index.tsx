import { ICategoria, IProduto } from "@/commons/interfaces";
import CardProduto from "@/components/CardProduto";
import { NavBarPesquisa } from "@/components/NavBarPesquisa";
import ProdutosService from "@/service/ProdutosService";
import { useEffect, useState } from "react";

export function Principal() {
  const [listaProdutos, setListaProdutos] = useState<IProduto[]>([]);
  const [listaProdutosFiltrada, setlistaProdutosFiltrada] = useState<
    IProduto[]
  >([]);
  const [apiError, setApiError] = useState("");
  const [pesquisa, setPesquisa] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] =
    useState<ICategoria | null>(null);

  useEffect(() => {
    carregarDados();
  }, []);

  useEffect(() => {
    let filtered = listaProdutos;
    if (pesquisa && (categoriaSelecionada?.id !== 0 && categoriaSelecionada?.id !== undefined)) {
      filtered = listaProdutos.filter(
        (produto) =>
          produto.nome.toLowerCase().includes(pesquisa.toLowerCase()) &&
          produto.categoria.id === categoriaSelecionada?.id
      );
    } else {
      if (pesquisa) {
        filtered = listaProdutos.filter((produto) =>
          produto.nome.toLowerCase().includes(pesquisa.toLowerCase())
        );
      } else {
        if (categoriaSelecionada?.id !== 0 && categoriaSelecionada?.id !== undefined) {
          filtered = listaProdutos.filter(
            (produto) => produto.categoria.id === categoriaSelecionada?.id
          );
        }
      }
    }

    setlistaProdutosFiltrada(filtered);
  }, [pesquisa, categoriaSelecionada, listaProdutos]);

  const carregarDados = async () => {
    try {
      const response = await ProdutosService.findAll();
      if (response.status === 200) {
        setListaProdutos(response.data);
        setlistaProdutosFiltrada(response.data);
      } else {
        setApiError("Falha ao carregar a lista de produtos!");
      }
    } catch (error) {
      setApiError("Falha ao carregar a lista de produtos!");
    }
  };

  return (
    <>
      <NavBarPesquisa
        pesquisa={pesquisa}
        setPesquisa={setPesquisa}
        categoriaSelecionada={categoriaSelecionada}
        setCategoriaSelecionada={setCategoriaSelecionada}
      />
      <main className="container">
        <div className="row">
          {listaProdutosFiltrada.map((produto) => (
            <CardProduto
              key={produto.idProduto}
              id={produto.idProduto}
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
