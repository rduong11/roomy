import API from "../config/apiClient";

export type LoginData = {
  email: string;
  password: string;
};

export type LoginResponse = {
  message: string;
  user: {
    id: string;
    email: string;
  };
};

export type RegisterData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type RegisterResponse = {
  message: string;
  user: {
    id: string;
    email: string;
  };
};

export const login = async (data: LoginData): Promise<LoginResponse> => {
  const response = await API.post<LoginResponse>("/auth/login", data);
  return response.data;
};

export const register = async (
  data: RegisterData
): Promise<RegisterResponse> => {
  const response = await API.post<RegisterResponse>("/auth/register", data);
  return response.data;
};
