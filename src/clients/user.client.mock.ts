import axios from "axios";
import type { UserClient, UserCreateDTO, UserDeleteResponseDTO, UserResponseDTO, UserUpdateDTO } from "./user.client";
import { Hex } from "@/utils/hex";

export interface UserMockResponseDTO {
  id: string;
  name: string;
  birthDate: string;
}

export class UserClientMock implements UserClient {
  async get(id: number): Promise<UserResponseDTO> {
    const resp = await axios.get<UserMockResponseDTO>(`/users/${Hex.from(id)}`);

    return this._fromMockResponse(resp.data);
  }

  async list(): Promise<UserResponseDTO[]> {
    const resp = await axios.get<UserMockResponseDTO[]>(`/users`);

    return resp.data.map(data => this._fromMockResponse(data));
  }

  async create(user: UserCreateDTO): Promise<UserResponseDTO> {
    const resp = await axios.post<UserMockResponseDTO>(`/users`, user);

    return this._fromMockResponse(resp.data);
  }

  async update(id: number, partial: UserUpdateDTO): Promise<UserResponseDTO> {
    const resp = await axios.patch<UserMockResponseDTO>(`/users/${Hex.from(id)}`, partial);

    return this._fromMockResponse(resp.data);
  }

  async delete(id: number): Promise<UserDeleteResponseDTO> {
    const deleted = await axios.delete(`/users/${Hex.from(id)}`)
      .then(() => true)
      .catch(() => false);

      return { deleted };
  }

  private _fromMockResponse(data: UserMockResponseDTO): UserResponseDTO {
    return {
      id: Hex.parse(data.id),
      name: data.name,
      birthDate: data.birthDate,
    };
  }
}