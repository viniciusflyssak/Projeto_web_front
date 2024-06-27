import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/Input";
import { api } from "@/lib/axios";
import AuthService from "../../service/AuthService";
import { IUserSignup } from "../../commons/interfaces";
import { NavBar } from "@/components/NavBar";

export function Cadastrar() {
    const [form, setForm] = useState({
        nome: "",
        username: "",
        email: "",
        senha: "",
    });
    const [errors, setErrors] = useState({
        nome: "",
        username: "",
        email: "",
        senha: "",
    });
    const navigate = useNavigate();
    const [pendingApiCall, setPendingApiCall] = useState(false);
    const [apiError, setApiError] = useState("");
    const [apiSuccess, setApiSuccess] = useState("");

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setForm((previousForm) => {
            return {
                ...previousForm,
                [name]: value,
            };
        });
    };

    const onClickSignup = async () => {
        setPendingApiCall(true);

        const user: IUserSignup = {
            nome: form.nome,
            username: form.username,
            email: form.email,
            senha: form.senha,
        };

        const response = await AuthService.signup(user);
        if (response.status === 200 || response.status === 201) {
            setApiSuccess("Novo usuário cadastrado!");
            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } else {
            setApiError("Ocorreu um erro no cadastro!");
            if (response.data.validationErrors) {
                setErrors(response.data.validationErrors);
            }
        }

        setPendingApiCall(false);
    };

    return (

        <>
                
                <div className="container-fluid bg-secondary d-grid place-items-center" style={{ minHeight: '100vh' }}>
                    <div className="row">

                        <div className="col-md-4">
                            <div style={{ height: '10vh' }}></div>
                            <div className=" border rounded bg-dark border-dark p-5">
                                <div className="row">
                                    <button className="btn col-md-1 p-">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="green" className="bi bi-arrow-left-square-fill" viewBox="0 0 16 16">
                                            <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1" />
                                        </svg>
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                    </button>
                                    <h2 className="text-start col-md-10 pt-1 text-light ps-3">
                                        Cadastrar
                                    </h2>
                                </div>
                                <div className="col-12">
                                    <div className="col-12 mb-3 text-light">
                                        <Input
                                            id="nome"
                                            name="nome"
                                            label="Nome:"
                                            type="text"
                                            value={form.nome}
                                            placeholder="Insira seu nome"
                                            hasError={errors.nome ? true : false}
                                            error={errors.nome}
                                            onChange={onChange}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="col-12 mb-3 text-light">
                                        <Input
                                            id="username"
                                            name="username"
                                            label="Username:"
                                            type="text"
                                            value={form.username}
                                            placeholder="Insira seu username"
                                            hasError={errors.username ? true : false}
                                            error={errors.username}
                                            onChange={onChange}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="col-12 mb-3 text-light">
                                        <Input
                                            id="email"
                                            name="email"
                                            label="Email:"
                                            type="text"
                                            value={form.email}
                                            placeholder="Insira seu email"
                                            hasError={errors.email ? true : false}
                                            error={errors.email}
                                            onChange={onChange}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="col-12 mb-3 text-light">
                                        <Input
                                            id="senha"
                                            name="senha"
                                            label="Senha:"
                                            type="text"
                                            value={form.senha}
                                            placeholder="Insira sua senha"
                                            hasError={errors.senha ? true : false}
                                            error={errors.senha}
                                            onChange={onChange}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="col-12 mb-3 text-center text-light">
                                        <button
                                            className="btn btn-success"
                                            onClick={onClickSignup}
                                            disabled={pendingApiCall}
                                        >
                                            Cadastrar
                                        </button>
                                        {pendingApiCall && <p className="text-light">Aguarde...</p>}
                                        {apiError && <p className="text-danger">{apiError}</p>}
                                        {apiSuccess && <p className="text-success">{apiSuccess}</p>}
                                    </div>
                                    <div className="col-12 text-center text-light">
                                        Já possui uma conta? <Link to="/entrar">Entrar</Link>
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
                </div>
        </>
    );
}