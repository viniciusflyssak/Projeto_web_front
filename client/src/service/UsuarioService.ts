import { api } from "@/lib/axios";

const URL = "/usuarios";

const findByUsername = async (username: string) => {
    let response;
    try {
      response = await api.get(URL+"/usuarioPorUsername?username="+username);
    } catch (error: any) {
      response = error.response;
    }
    return response;
  };
  
  const UsuarioService = { findByUsername };
  export default UsuarioService;
  