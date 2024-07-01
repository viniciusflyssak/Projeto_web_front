import { api } from "@/lib/axios";
import { IUserLogin, IUserSignup } from "@/commons/interfaces";

const signup = async (user: IUserSignup): Promise<any> => {
  let response;
  try {
    response = await api.post("/usuarios", user);
  } catch (error: any) {
    response = error.response;
  }
  return response;
};

const login = async (user: IUserLogin): Promise<any> => {
  let response;
  try {
    response = await api.post("/login", user);
  } catch (error: any) {
    response = error.response;
  }
  return response;
};

const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("token");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
      token
    )}`;
  }
  return token ? true : false;
};

const AuthService = {
  signup,
  login,	
  isAuthenticated
};

export default AuthService;
