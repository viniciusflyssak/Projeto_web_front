import { api } from "@/lib/axios";
import { IUserLogin, IUserSignup } from "@/commons/interfaces";

const signup = async (user: IUserSignup) => {
  let response;
  try {
    response = await api.post("/users", user);
  } catch (error: any) {
    response = error.response;
  }
  return response;
};

const login = async (user: IUserLogin) => {
  let response;
  try {
    response = await api.post("/login", user);
    localStorage.setItem("token", JSON.stringify(response.data.token));

    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.data.token}`;
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
