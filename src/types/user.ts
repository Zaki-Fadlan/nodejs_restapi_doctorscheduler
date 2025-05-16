import { Role, Permission } from "./role";

export interface User {
  id: string;
  name: string;
  username: string;
  password: string;
  role_id: number;
  role?: Role;
  role_name?: string;
  permissions?: Permission[];
  created_at: Date;
}

export interface UserDTO {
  name: string;
  username: string;
  password: string;
}

export interface LoginDTO {
  username: string;
  password: string;
}
