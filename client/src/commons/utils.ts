import { IItensPedido, IPedido, IProduto } from "./interfaces";

export const adicionarAoCarrinho = (produto: IProduto) => {
  let pedidoString = localStorage.getItem("pedido");
  let pedidoObj: IPedido = pedidoString ? JSON.parse(pedidoString) : null;
  if (!pedidoObj) {
    pedidoObj = {
      itensPedido: [],
      valor: 0,
      data: "",
      id: 0,
      formaPagamento: 0,
      usuario: { username: "", nome: "", email: "", senha: "" },
    };
  }
  let itemPedido = pedidoObj.itensPedido.find(
    (item: IItensPedido) => item.produto.idProduto === produto.idProduto
  );
  if (itemPedido) {
    itemPedido.qtde += 1;
    itemPedido.preco = produto.preco;
  } else {
    pedidoObj.itensPedido.push({
      produto: produto,
      qtde: 1,
      preco: produto.preco,
      id: 0,
    });
  }
  pedidoObj.valor += produto.preco;
  localStorage.setItem("pedido", JSON.stringify(pedidoObj));
};
