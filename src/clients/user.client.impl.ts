import axios from "axios";
import type { UserClient, UserCreateDTO, UserDeleteResponseDTO, UserResponseDTO, UserUpdateDTO } from "./user.client";

export class UserClientImpl implements UserClient {
  async get(id: number): Promise<UserResponseDTO> {
    const resp = await axios.get<UserResponseDTO>(`/users/${id}`);

    return resp.data;
  }

  async list(page?: number | undefined): Promise<UserResponseDTO[]> {
    const resp = await axios.get<UserResponseDTO[]>('/users', { params: { page } });

    return resp.data;
  }

  async create(user: UserCreateDTO): Promise<UserResponseDTO> {
    const resp = await axios.post<UserResponseDTO>('/users', user);

    return resp.data;
  }

  async update(id: number, partial: UserUpdateDTO): Promise<UserResponseDTO> {
    const resp = await axios.put(`/users/${id}`, partial);

    return resp.data;
  }

  async delete(id: number): Promise<UserDeleteResponseDTO> {
    const resp = await axios.delete<UserDeleteResponseDTO>(`/users/${id}`);

    return resp.data;
  }
}