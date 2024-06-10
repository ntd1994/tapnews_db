import { GetUsersByIdResponse, GetUsersResponse, UpsertUserRequest, UpsertUserResponse } from "~/models/user.model";
import { HttpClient } from "./http-client";
import {
  GetCategoriesResponse,
  GetCategoryByIdResponse,
  UpsertCategoryRequest,
  UpsertCategoryResponse
} from "~/models/category.model";
import { SelectOptionResponse } from "~/models/role.model";

export class AdminConsoleApi extends HttpClient {
  async getUsers(search: string): Promise<GetUsersResponse> {
    return await this.call("GET", "api/admin-console/users", undefined, search)
  }

  async getUsersById(userId: string): Promise<GetUsersByIdResponse> {
    return await this.call("GET", `api/admin-console/users/${userId}`)
  }

  async upsertUser(userRequest: UpsertUserRequest): Promise<UpsertUserResponse> {
    return await this.call("POST", "api/admin-console/users", userRequest)
  }

  async deleteUser(userId: string): Promise<GetUsersByIdResponse> {
    return await this.call("DELETE", `api/admin-console/users/${userId}`)
  }

  async getCategoriesParents(): Promise<GetCategoriesResponse> {
    return await this.call("GET", "api/admin-console/categories/parents")
  }

  async getCategories(): Promise<GetCategoriesResponse> {
    return await this.call("GET", "api/admin-console/categories")
  }

  async getCategoryById(categoryId: string): Promise<GetCategoryByIdResponse> {
    return await this.call("GET", `api/admin-console/categories/${categoryId}`)
  }

  async upsertCategory(categoryRequest: UpsertCategoryRequest): Promise<UpsertCategoryResponse> {
    return await this.call("POST", "api/admin-console/categories", categoryRequest)
  }

  async deleteCategory(categoryId: string): Promise<GetCategoryByIdResponse> {
    return await this.call("DELETE", `api/admin-console/categories/${categoryId}`)
  }
  
  async getSelectRoles(): Promise<SelectOptionResponse> {
    return await this.call("GET", "api/admin-console/select/roles")
  }
}