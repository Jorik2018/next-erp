import {
  AuthUser,
  RegisterCredentials,
} from "./auth.types";

export interface AuthService {
  register(
    credentials: RegisterCredentials
  ): Promise<AuthUser>;

  login(
    email: string,
    password: string
  ): Promise<AuthUser>;

  logout(): Promise<void>;

  getCurrentUser():
    Promise<AuthUser | null>;
}