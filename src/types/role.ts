export interface Role {
  id: number;
  name: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Permission {
  id: number;
  name: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
}

export interface RolePermission {
  role_id: number;
  permission_id: number;
  created_at: Date;
}

export interface UserRole {
  role_id: number;
  permission_id: number;
  created_at: Date;
}
export type PermissionName =
  | "create:schedule"
  | "read:schedule"
  | "update:schedule"
  | "delete:schedule";

export type RoleName =
  | "admin"
  | "doctor"
  | "nurse"
  | "receptionist"
  | "patient"
  | "guest";

export interface CreateRoleDTO {
  name: string;
  description?: string;
  permissions: number[];
}
export interface UpdateRoleDTO {
  description?: string;
  permissions?: number[];
}
