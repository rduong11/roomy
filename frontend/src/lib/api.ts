import type { AxiosResponse } from "axios";
import API from "../config/apiClient";

type LoginData = {
  email: string;
  password: string;
};

type LoginResponse = {
  message: string;
  user: {
    id: string;
    email: string;
  };
};

export const login = async (
  data: LoginData
): Promise<AxiosResponse<LoginResponse>> => {
  return API.post("/auth/login", data);
};
