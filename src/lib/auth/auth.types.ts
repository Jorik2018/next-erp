export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}