import { UserClientImpl } from "./user.client.impl";
import { UserClientMock } from "./user.client.mock";

export interface UserResponseDTO {
  readonly id: number;
  readonly name: string;
  readonly birthDate: string;
}

export interface UserCreateDTO {
  name: string;
  birthDate: Date;
  password: string;
}

export interface UserPasswordUpdateDTO {
  old: string;
  new: string;
}

export interface UserUpdateDTO {
  name?: string;
  birthDate?: Date;
  password?: UserPasswordUpdateDTO;
}

export interface UserDeleteResponseDTO {
  readonly deleted: boolean;
}

export abstract class UserClient {
  abstract get(id: number): Promise<UserResponseDTO>;
  abstract list(page?: number): Promise<UserResponseDTO[]>;
  abstract create(user: UserCreateDTO): Promise<UserResponseDTO>;
  abstract update(id: number, partial: UserUpdateDTO): Promise<UserResponseDTO>;
  abstract delete(id: number): Promise<UserDeleteResponseDTO>;

  static get(): UserClient {
    const { VITE_USER_CLIENT } = import.meta.env;

    if (String(VITE_USER_CLIENT).toLowerCase() === 'prod') {
      return new UserClientImpl();
    }

    return new UserClientMock();
  }
}

