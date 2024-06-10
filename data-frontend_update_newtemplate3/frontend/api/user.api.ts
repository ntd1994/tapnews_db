import { HttpClient } from "./http-client";
import { ChangePasswordRequest, UpdateUserRequest } from "models/user.model";

export class UserApi extends HttpClient {
  private readonly baseUrl = "api/users";

  async updateUser(input: UpdateUserRequest): Promise<void> {
    await this.call("PUT", `${this.baseUrl}/me`, input);
  }

  async changePassword(input: ChangePasswordRequest): Promise<void> {
    await this.call("POST", `${this.baseUrl}/change-password`, input);
  }
}
