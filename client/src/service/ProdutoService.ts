import { api } from "@/lib/axios";

const URL = "/produtos";

const findAll = async () => {
  let response;
  try {
    response = await api.get(URL);
  } catch (error: any) {
    response = error.response;
  }
  return response;
};

const ProdutoService = { findAll };
export default ProdutoService;
