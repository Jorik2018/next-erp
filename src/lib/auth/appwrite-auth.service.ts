import { ID } from "appwrite";

import { account } from "@/lib/appwrite/client";

import type {
  AuthUser,
  RegisterCredentials,
} from "./auth.types";

import type {
  AuthService,
} from "./auth.service";

export class AppwriteAuthService
  implements AuthService
{
  async register({
    name,
    email,
    password,
  }: RegisterCredentials): Promise<AuthUser> {
    const user =
      await account.create({
        userId: ID.unique(),
        email,
        password,
        name,
      });

    await account.createEmailPasswordSession({
      email,
      password,
    });

    return {
      id: user.$id,
      email: user.email,
      name: user.name,
    };
  }

  async login(
    email: string,
    password: string
  ): Promise<AuthUser> {
    await account.createEmailPasswordSession({
      email,
      password,
    });

    const user =
      await account.get();

    return {
      id: user.$id,
      email: user.email,
      name: user.name,
    };
  }

  async logout(): Promise<void> {
    await account.deleteSession({
      sessionId: "current",
    });
  }

  async getCurrentUser():
    Promise<AuthUser | null> {
    try {
      const user =
        await account.get();

      return {
        id: user.$id,
        email: user.email,
        name: user.name,
      };
    } catch {
      return null;
    }
  }
}