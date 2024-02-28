import axios from "axios";
import type { UserClient, UserCreateDTO, UserDeleteResponseDTO, UserResponseDTO, UserUpdateDTO } from "./user.client";
import { Hex } from "@/utils/hex";

export interface UserMockEntity {
  id: string;
  name: string;
  birthDate: string;
  password: string;
}

export class UserClientMock implements UserClient {
  async get(id: number): Promise<UserResponseDTO> {
    const resp = await axios.get<UserMockEntity>(`/users/${Hex.from(id)}`);

    return this._fromMockResponse(resp.data);
  }

  async list(): Promise<UserResponseDTO[]> {
    const resp = await axios.get<UserMockEntity[]>(`/users`);

    return resp.data.map(data => this._fromMockResponse(data));
  }

  async create(user: UserCreateDTO): Promise<UserResponseDTO> {
    const resp = await axios.post<UserMockEntity>(`/users`, user);

    return this._fromMockResponse(resp.data);
  }

  async update(id: number, partial: UserUpdateDTO): Promise<UserResponseDTO> {
    const resp = await axios.patch<UserMockEntity>(`/users/${Hex.from(id)}`, {
      name: partial.name,
      birthDate: partial.birthDate as string | undefined,
      password: partial.password?.new,
    } satisfies Partial<UserMockEntity>);

    return this._fromMockResponse(resp.data);
  }

  async delete(id: number): Promise<UserDeleteResponseDTO> {
    const deleted = await axios.delete(`/users/${Hex.from(id)}`)
      .then(() => true)
      .catch(() => false);

      return { deleted };
  }

  private _fromMockResponse(data: UserMockEntity): UserResponseDTO {
    return {
      id: Hex.parse(data.id),
      name: data.name,
      birthDate: data.birthDate,
    };
  }
}