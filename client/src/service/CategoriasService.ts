import { api } from "@/lib/axios";

const URL = "/categorias";

const findAll = async () => {
  let response;
  try {
    response = await api.get(URL);
  } catch (error: any) {
    response = error.response;
  }
  return response;
};

const CategoriasService = { findAll };
export default CategoriasService;
