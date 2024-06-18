import { api } from "@/lib/axios";

const URL = "/categories";

const findAll = async () => {
  let response;
  try {
    response = await api.get(URL);
  } catch (error: any) {
    response = error.response;
  }
  return response;
};

const CategoryService = { findAll };
export default CategoryService;
