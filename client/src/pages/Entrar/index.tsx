import { IUserLogin } from "@/commons/interfaces";
import { Input } from "@/components/Input";
import { NavBar } from "@/components/NavBar";
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
      <NavBar />
      <div
        className="container-fluid d-flex justify-content-center align-items-center bg-secondary"
        style={{ minHeight: "41.3rem" }}
      >
        <div className="row justify-content-center" style={{ width: "100%" }}>
          <div className="col-md-4 text-center">
            <div className="border rounded bg-dark border-dark p-5">
              <div className="row mb-3">
                <button className="btn col-md-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    fill="green"
                    className="bi bi-arrow-left-square-fill"
                    viewBox="0 0 16 16"
                    onClick={() => navigate(`/`)}
                  >
                    <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1" />
                  </svg>
                </button>
                <h2 className="text-start col-md-10 pt-1 text-light ms-3">
                  Entrar
                </h2>
              </div>
              <div className="mb-3 text-light">
                <Input
                  id="username"
                  name="username"
                  label="Username:"
                  type="text"
                  value={form.username}
                  placeholder="Insira seu username"
                  onChange={onChange}
                  className="form-control"
                  hasError={false}
                  error={""}
                />
              </div>
              <div className="mb-3 text-light">
                <Input
                  id="senha"
                  name="senha"
                  label="Senha:"
                  type="text"
                  value={form.senha}
                  placeholder="Insira sua senha"
                  onChange={onChange}
                  className="form-control"
                  hasError={false}
                  error={""}
                />
              </div>
              <div className="text-center">
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
      </div>
    </>
  );
}
