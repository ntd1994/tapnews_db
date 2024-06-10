import {
  AccountCredentials,
  RegisterRequest,
  TokenDto,
  UserSecretTokenDto,
} from "~/models/auth.model";
import { HttpClient } from "./http-client";

export class AuthApi extends HttpClient {
  private readonly baseUrl = "api/auth";

  async signIn(input: AccountCredentials): Promise<TokenDto> {
    return await this.call("POST", `${this.baseUrl}/sign-in`, input);
  }

  async signUp(input: RegisterRequest): Promise<TokenDto> {
    return await this.call("POST", `${this.baseUrl}/sign-up`, input);
  }

  async signInWithToken(input: UserSecretTokenDto) {
    return await this.call("POST", `${this.baseUrl}/sign-in-with-token`, input);
  }

  async revoke() {
    await this.call("POST", `${this.baseUrl}/revoke`);
  }
}
