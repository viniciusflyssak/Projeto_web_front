import CardProduto from "@/components/CardProduto";
import { NavBar } from "@/components/NavBar";

export function Principal() {
  const produtos = [
    {
      id: 1,
      nome: "Playstation 5",
      preco: 2000,
      imagem:
        "https://www.araquariev.com.br/wp-content/uploads/sites/445/2015/10/Logo-teste.jpg",
    },
    {
      id: 2,
      nome: "Iphone 15",
      preco: 4000,
      imagem:
        "https://a-static.mlcdn.com.br/500x500/aspirador-de-po-e-agua-wap-1400w-gtw-compact-preto-e-turquesa/magazineluiza/237917600/c8eb0a90b9c3f2e5eb19811b17fe8cb0.jpg",
    },
  ];
  return (
    <>
      <main className="container">
        <NavBar />
        <div className="row">
          {produtos.map((produto) => (
            <CardProduto
              titulo={produto.nome}
              preco={produto.preco}
              imagem={produto.imagem}
            />
          ))}
        </div>
      </main>
    </>
  );
}
