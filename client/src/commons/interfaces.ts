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

export interface IUser {
  id: number;
  nome: string;
  username: string;
  email: string;
  senha: string;
  
}

export interface ICategoria {
  id?: number;
  nome: string;
}
export interface IProduto {
  idProduto?: number;
  nome: string;
  descricao: number;
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
  id: number;
  valor: number;
  data: string;
  formaPagamento: number;
  usuario: IUserSignup;
  itensPedido: IItensPedido[];
}