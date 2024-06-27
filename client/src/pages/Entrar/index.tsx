import { IUserLogin } from "@/commons/interfaces";
import { Input } from "@/components/Input";
import AuthService from "@/service/AuthService";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export function Entrar() {
  const [form, setForm] = useState({
    username: "",
    senha: "",
  });
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");
  const navigate = useNavigate();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setForm((previousForm) => {
      return {
        ...previousForm,
        [name]: value,
      };
    });
  };

  const onClickLogin = async () => {
    setPendingApiCall(true);
    event?.preventDefault();
    const login: IUserLogin = {
      username: form.username,
      senha: form.senha,
    };

    const response = await AuthService.login(login);
    if (response.status === 200 || response.status === 201) {
      setApiSuccess("Login realizado com sucesso!");
      setTimeout(() => {
        navigate("/principal");
      }, 1000);
    } else {
      setApiError("Erro o login do usuário!");
    }

    setPendingApiCall(false);
  };

  return (
    <>
      <div className="container-fluid bg-secondary d-grid place-items-center" style={{ minHeight: '100vh' }}>
        
        <div className="row ">
          <div className="col-md-4">
          <div style={{ height: '10vh' }}></div>
            <div className="border rounded bg-dark border-dark p-5">
              <div className="row">
                <button className="btn col-md-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="green" className="bi bi-arrow-left-square-fill" viewBox="0 0 16 16">
                    <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1" />
                      </svg>
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </button>
                <h2 className="text-start col-md-10 pt-1 text-light ps-3">
                  Entrar
                </h2>
              </div>
              <div className="col-12">
                <div className="col-12 mb-3 text-light">
                  <Input
                    id="username"
                    name="username"
                    label="Username:"
                    type="text"
                    value={form.username}
                    placeholder="Insira seu username"
                    onChange={onChange}
                    className="form-control" hasError={false} error={""} />
                </div>
                <div className="col-12 mb-3 text-light">
                  <Input
                    id="senha"
                    name="senha"
                    label="Senha:"
                    type="text"
                    value={form.senha}
                    placeholder="Insira sua senha"
                    onChange={onChange}
                    className="form-control" hasError={false} error={""} />
                </div>
                <div className="col-12 mb-3 text-center">
                  <button
                    className="btn btn-primary btn-success"
                    onClick={onClickLogin}
                    disabled={pendingApiCall}
                  >
                    Entrar
                  </button>
                  {pendingApiCall && <p className="text-light">Aguarde...</p>}
                  {apiError && <p className="text-danger">{apiError}</p>}
                  {apiSuccess && <p className="text-success">{apiSuccess}</p>}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="container text-center">
              <img
                src={
                  "https://www.araquariev.com.br/wp-content/uploads/sites/445/2015/10/Logo-teste.jpg"
                }
                width="60"
                alt="Logo"
              />
            </div>
          </div>

        </div>
      </div >
    </>
  );
}