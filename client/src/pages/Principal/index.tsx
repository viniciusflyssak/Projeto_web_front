import { ICategoria, IProduto } from "@/commons/interfaces";
import CardProduto from "@/components/CardProduto";
import { NavBarPesquisa } from "@/components/NavBarPesquisa";
import ProdutosService from "@/service/ProdutosService";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

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
    if (
      pesquisa &&
      categoriaSelecionada?.id !== 0 &&
      categoriaSelecionada?.id !== undefined
    ) {
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
        if (
          categoriaSelecionada?.id !== 0 &&
          categoriaSelecionada?.id !== undefined
        ) {
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
              idProduto={produto.idProduto}
              nome={produto.nome}
              preco={produto.preco}
              imagem={produto.imagem}
              categoria={produto.categoria}
              descricao={produto.descricao}
            />
          ))}
        </div>
        {apiError && <p>{apiError}</p>}
      </main>
      <Button
        variant="warning"
        style={{ position: "fixed", bottom: "20px", right: "20px", zoom: 1.5}}
        href="/carrinho"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="white"
          className="bi bi-cart"
          viewBox="0 0 16 16"
        >
          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
        </svg>
      </Button>
    </>
  );
}
