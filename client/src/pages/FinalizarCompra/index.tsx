
import ProdutosService from "@/service/ProdutosService";
import { useEffect, useState } from "react";
import { ICategoria, IPedido, IProduto, IUser } from "@/commons/interfaces";
import CardProduto from "@/components/CardProduto";
import { NavBar } from "@/components/NavBar";
import { bottom } from "@popperjs/core";
import { useNavigate } from "react-router-dom";
import PedidosService from "@/service/PedidosService";
import { NavBarPesquisa } from "@/components/NavBarPesquisa";


export function FinalizarCompra() {
  const navigate = useNavigate();
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [apiSuccess, setApiSuccess] = useState("");
  const [listaProdutos, setListaProdutos] = useState<IProduto[]>([]);
  const [filteredData, setFilteredData] = useState<IProduto[]>([]);
  const [apiError, setApiError] = useState("");
  const [pesquisa, setPesquisa] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<ICategoria | null>(null);

  const onClickPost = async () => {
    setPendingApiCall(true);

    const user: IUser = {
      id: 0,
      nome: "",
      username: "",
      email: "",
      senha: ""
    }

    const pedido: IPedido = {
      id: 0,
      valor: 0,
      data: "",
      formaPagamento: 0,
      usuario: user,
      itensPedido: []
    }

    try {
      const pedidosCarrinhoString = localStorage.getItem('pedidosCarrinho');
      if (pedidosCarrinhoString) {
        const pedidosCarrinho: IPedido = JSON.parse(pedidosCarrinhoString);

        pedido.id = pedidosCarrinho.id;
        pedido.valor = pedidosCarrinho.valor;
        pedido.data = pedidosCarrinho.data;
        pedido.formaPagamento = pedidosCarrinho.formaPagamento;
        pedido.usuario = pedidosCarrinho.usuario;
        pedido.itensPedido = pedidosCarrinho.itensPedido;
      }

      const response = await PedidosService.postPedido(pedido);
      if (response.status === 200 || response.status === 201) {
        setApiSuccess("Novo pedido cadastrado!");
        setTimeout(() => {
          navigate("/principal");
        }, 1000);

      }

    } catch (error) {
      console.error('Erro ao processar pedido:', error);
      setApiError("Ocorreu um erro ao processar o pedido.");
    }

    setPendingApiCall(false);

  };

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

  const pedidosCarrinhoStr = localStorage.getItem('pedidosCarrinho');

  if (pedidosCarrinhoStr) {
    const pedidosCarrinho = JSON.parse(pedidosCarrinhoStr);

    const pedido: IPedido = {
      id: pedidosCarrinho.id,
      valor: pedidosCarrinho.valor,
      data:pedidosCarrinho.data,
      formaPagamento: pedidosCarrinho.formaPagamento,
      usuario: pedidosCarrinho.usuario,
      itensPedido: pedidosCarrinho.itensPedido
    };

    console.log(pedido);
  } else {
    console.error('Não foi possível encontrar "pedidosCarrinho" no localStorage.');
  }


  return (
    <>
      <NavBar />

      <div className="container-fluid bg-secondary d-grid place-items-center" style={{ minHeight: '41.3rem' }}>
        <div className="row ">
          <div className="col-md-1"></div>
          <div className="col-md-7 p-10">
            <div style={{ height: '5vh' }}></div>
            <div className="border rounded bg-dark border-dark p-5 ">
              <table className="table">
                <thead>
                  <tr style={{ borderBottom: '1px solid white' }}>
                    <th className="text-light bg-dark"></th>
                    <th className="text-light bg-dark">Código</th>
                    <th className="text-light bg-dark">Nome</th>
                    <th className="text-light bg-dark">Preço</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {pedidosCarrinho.itensPedido.map((item, index) => (
                    <tr key={index}>
                      <td></td>
                      <td>{item.id}</td>
                      <td>{item.nome}</td>
                      <td>{item.preco}</td>
                    </tr>
                  ))} */}
                </tbody>
              </table>
            </div>

          </div>
          <div className="col-md-3 p-10">
            <div style={{ height: '5vh' }}></div>
            <div className="border rounded bg-dark border-dark px-5 py-4">
              <div className="row " style={{ borderBottom: '1px solid white' }}>
                <i className="col-md-2"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green" className="bi bi-cart-check-fill" viewBox="0 0 16 16">
                  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708" />
                </svg></i>
                <h5 className="text-light col-md-10 pb-2 " >RESUMO DA COMPRA</h5>
              </div>
              <div className="text-light p-2 row " style={{ borderBottom: '1px solid white' }}>
                <p className="col-md-6" style={{ margin: 'auto 0' }}>Total</p>
                <p className="col-md-6" style={{ margin: 'auto 0' }}>R${ }</p>
              </div>
              <div className="text-light p-2 row" style={{ borderBottom: '1px solid white' }}>
                <p className="col-md-6" style={{ margin: 'auto 0' }}>Descontos</p>
                <p className="col-md-6" style={{ margin: 'auto 0' }}>R${ }</p>
              </div>
              <div className="text-light p-2 row" style={{ borderBottom: '1px solid white' }}>
                <p className="col-md-6" style={{ margin: 'auto 0' }}>Frete</p>
                <p className="col-md-6" style={{ margin: 'auto 0' }}>R${ }</p>
              </div>

              <div className="row pt-5" style={{ borderBottom: '1px solid white' }}>
                <i className="col-md-2"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green" className="bi bi-credit-card-2-front-fill" viewBox="0 0 16 16">
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2.5 1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm0 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z" />
                </svg></i>
                <h5 className="text-light col-md-10 pb-2" >FORMA DE PAGAMENTO</h5>
                <div className="col-md-12 pb-3">
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="formaPagamento" id="boleto" value="boleto" />
                    <label className="form-check-label text-light" htmlFor="boleto">
                      Boleto
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="formaPagamento" id="cartaoCredito" value="cartaoCredito" />
                    <label className="form-check-label text-light" htmlFor="cartaoCredito" style={{ fill: "green" }}>
                      Cartão de Crédito
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="formaPagamento" id="cartaoDebito" value="cartaoDebito" />
                    <label className="form-check-label text-light" htmlFor="cartaoDebito">
                      Cartão de Débito
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="formaPagamento" id="pix" value="pix" />
                    <label className="form-check-label text-light" htmlFor="pix">
                      PIX
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-12 mb-3 text-center text-light pt-4">
                <button
                  className="btn btn-success col-12"
                  onClick={onClickPost}
                  disabled={pendingApiCall}>
                  Confirmar Compra
                </button>
                {pendingApiCall && <p className="text-light">Aguarde...</p>}
                {apiError && <p className="text-danger">{apiError}</p>}
                {apiSuccess && <p className="text-success">{apiSuccess}</p>}
              </div>
            </div>

          </div>
        </div>
      </div>

    </>
  );
};

