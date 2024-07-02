export interface IUserSignup {
  nome: string;
  email:string;
  username: string;
  senha: string;
}

export interface IUserLogin {
  username: string;
  senha: string;
}

export interface IUsuario {
  id: number;
  nome: string;
  username: string;
  email: string;
}

export interface ICategoria {
  id: number;
  nome: string;
}
export interface IProduto {
  idProduto: number;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
  categoria: ICategoria;
}

export interface IItensPedido {
  id: number;
  produto: IProduto;
  qtde: number;
  preco: number; 
}

export interface IPedido {
  id?: number | undefined;
  valor: number;
  data: string;
  formaPagamento: number;
  usuario: IUsuario;
  itensPedido: IItensPedido[];
}