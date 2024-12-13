export interface UserCreateInput {
  email: string;
  password: string;
  name?: string;
}

export interface UserLoginInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: number;
    email: string;
    name?: string;
  };
  token: string;
}