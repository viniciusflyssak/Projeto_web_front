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

const findOne = async (id: string) => {
  let response;
  try {
    response = await api.get(URL+"/"+id);
  } catch (error: any) {
    response = error.response;
  }
  return response;
};

const ProdutosService = { findAll, findOne };
export default ProdutosService;
