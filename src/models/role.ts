import pool from "../config/database";
import { Role, Permission, CreateRoleDTO, UpdateRoleDTO } from "../types/role";

export class RoleModel {
  static async findAll(): Promise<(Role & { permissions: Permission[] })[]> {
    const result = await pool.query(
      `SELECT r.*, json_agg(
                DISTINCT jsonb_build_object(
                    'id',p.id,
                    'name',p.name,
                    'description',p.description,
                )
            ) as permissions
            FROM roles r
            LEFT JOIN role_permissions rp ON r.id = rp.role_id
            LEFT JOIN permissions p ON rp.permission_id = p.id
            GROUP BY r.id
            `
    );
    return result.rows.map((row) => ({
      ...row,
      permissions: (row.permissions || []).filter(
        (p: Permission | null) => p !== null
      ),
    }));
  }
}
