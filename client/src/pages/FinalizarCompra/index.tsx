import { ChangeEvent, useEffect, useState } from "react";
import { IPedido, IUsuario } from "@/commons/interfaces";
import { NavBar } from "@/components/NavBar";
import { useNavigate } from "react-router-dom";
import AuthService from "@/service/AuthService";
import PedidosService from "@/service/PedidosService";

export function FinalizarCompra() {
  const navigate = useNavigate();
  const [pedido, setPedido] = useState<IPedido>();
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [apiSuccess, setApiSuccess] = useState("");
  const [apiError, setApiError] = useState("");
  const [formaPagamento, setFormaPagamento] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const pedidoString = localStorage.getItem("pedido");
      const pedidoObj: IPedido = pedidoString ? JSON.parse(pedidoString) : null;

      const usuarioStr = localStorage.getItem("usuario");
      const usuario: IUsuario = usuarioStr ? JSON.parse(usuarioStr) : null;

      pedidoObj.usuario = usuario;

      setPedido(pedidoObj);
    } catch (error) {
      setApiError("Falha ao carregar pedido!");
    }
  };


  const handleFormaPagamentoChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormaPagamento(event.target.value);
  };

  const obterFormaPagamento = () => {
    switch (formaPagamento) {
      case 'boleto':
        return 0;
      case 'cartaoCredito':
        return 1;
      case 'cartaoDebito':
        return 2;
      case 'pix':
        return 3;
      default:
        return -1;
    }
  };
  
  const onClickPost = async (pedido: IPedido) => {
    setPendingApiCall(true);

    const dataAtual = new Date().toISOString();

    pedido.data = dataAtual;
    pedido.formaPagamento = obterFormaPagamento();


    const response = await PedidosService.postPedido(pedido);
    if (response.status === 200 || response.status === 201) {
      setApiSuccess("Pedido realizado com sucesso!");
      setTimeout(() => {
        navigate("/principal");
      }, 1000);
    } else {
      setApiError("Ocorreu um erro na realização do pedido!");
      if (response.data.validationErrors) {
      }
    }

    setPendingApiCall(false);
  };

  return (
    <>
      <NavBar />

      <div
        className="container-fluid bg-secondary d-grid place-items-center"
        style={{ minHeight: "41.3rem" }}
      >
        <div className="row ">
          <div className="col-md-1"></div>
          <div className="col-md-7 p-10">
            <div style={{ height: "5vh" }}></div>
            <div className="border rounded bg-dark border-dark p-5 ">
              <table className="table">
                <thead>
                  <tr style={{ borderBottom: "1px solid white" }}>
                    <th className="text-light bg-dark"></th>
                    <th className="text-light bg-dark">Código</th>
                    <th className="text-light bg-dark">Nome</th>
                    <th className="text-light bg-dark">Preço</th>
                  </tr>
                </thead>
                <tbody>
                  {pedido?.itensPedido.map((item, index) => (
                    <tr key={index}>
                      <td></td>
                      <td className="text-light bg-dark">{item.produto.idProduto}</td>
                      <td className="text-light bg-dark">{item.produto.nome}</td>
                      <td className="text-light bg-dark">{item.preco}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-3 p-10">
            <div style={{ height: "5vh" }}></div>
            <div className="border rounded bg-dark border-dark px-5 py-4">
              <div className="row " style={{ borderBottom: "1px solid white" }}>
                <i className="col-md-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="green"
                    className="bi bi-cart-check-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708" />
                  </svg>
                </i>
                <h5 className="text-light col-md-10 pb-2 ">RESUMO DA COMPRA</h5>
              </div>
              <div
                className="text-light p-2 row "
                style={{ borderBottom: "1px solid white" }}
              >
                <p className="col-md-6" style={{ margin: "auto 0" }}>
                  Total
                </p>
                <p className="col-md-6" style={{ margin: "auto 0" }}>
                  R$ {pedido?.valor.toFixed(2).replace(".", ",")}
                </p>
              </div>
              <div
                className="text-light p-2 row"
                style={{ borderBottom: "1px solid white" }}
              >
                <p className="col-md-6" style={{ margin: "auto 0" }}>
                  Descontos
                </p>
                <p className="col-md-6" style={{ margin: "auto 0" }}>
                  R$ 0,00
                </p>
              </div>
              <div
                className="text-light p-2 row"
                style={{ borderBottom: "1px solid white" }}
              >
                <p className="col-md-6" style={{ margin: "auto 0" }}>
                  Frete
                </p>
                <p className="col-md-6" style={{ margin: "auto 0" }}>
                  R$ 40,00
                </p>
              </div>

              <div
                className="row pt-5"
                style={{ borderBottom: "1px solid white" }}
              >
                <i className="col-md-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="green"
                    className="bi bi-credit-card-2-front-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2.5 1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm0 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z" />
                  </svg>
                </i>
                <h5 className="text-light col-md-10 pb-2">
                  FORMA DE PAGAMENTO
                </h5>
                <div className="col-md-12 pb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="formaPagamento"
                      id="boleto"
                      value="boleto"
                      checked={formaPagamento === 'boleto'}
                      onChange={handleFormaPagamentoChange}
                      defaultChecked 
                    />
                    <label className="form-check-label text-light" htmlFor="boleto">
                      Boleto
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="formaPagamento"
                      id="cartaoCredito"
                      value="cartaoCredito"
                      checked={formaPagamento === 'cartaoCredito'}
                      onChange={handleFormaPagamentoChange}
                    />
                    <label
                      className="form-check-label text-light"
                      htmlFor="cartaoCredito"
                      style={{ fill: 'green' }}
                    >
                      Cartão de Crédito
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="formaPagamento"
                      id="cartaoDebito"
                      value="cartaoDebito"
                      checked={formaPagamento === 'cartaoDebito'}
                      onChange={handleFormaPagamentoChange}
                    />
                    <label className="form-check-label text-light" htmlFor="cartaoDebito">
                      Cartão de Débito
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="formaPagamento"
                      id="pix"
                      value="pix"
                      checked={formaPagamento === 'pix'}
                      onChange={handleFormaPagamentoChange}
                    />
                    <label className="form-check-label text-light" htmlFor="pix">
                      PIX
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-12 mb-3 text-center text-light pt-4">
                <button className="btn btn-primary" onClick={( ) => pedido && onClickPost(pedido)}>
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
}
