import db from "../config/database";
import { Permission, Role } from "../types/role";
import { User, UserDTO } from "../types/user";
import { hashPassword } from "../utils/auth";

export class UserModel {
  static async createUser(
    userData: UserDTO & { role_id?: number }
  ): Promise<User> {
    try {
      const hashedPassword = await hashPassword(userData.password);
      const defaultRole = 6;
      const result = await db.query(
        `INSERT INTO users (name,username,password,role_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *, (SELECT name FROM roles where id = role_id) as role_name
        `,
        [
          userData.name,
          userData.username,
          hashedPassword,
          userData.role_id || defaultRole,
        ]
      );
      if (!result.rows[0]) {
        throw new Error("User creation failed");
      }
      return result.rows[0];
    } catch (error: any) {
      if (error.code === "23505") {
        throw new Error("Username already exists");
      }
      throw new Error("User creation failed");
    }
  }
  static async findByUsername(username: string): Promise<User | null> {
    const result = await db.query(
      `SELECT u.*, r.name as role_name 
       FROM users u 
       LEFT JOIN roles r ON u.role_id = r.id 
       WHERE u.username = $1`,
      [username]
    );
    return result.rows[0] || null;
  }
  static async findById(id: string): Promise<User> {
    const result = await db.query(
      `SELECT u.*, r.name as role_name 
       FROM users u 
       LEFT JOIN roles r ON u.role_id = r.id 
       WHERE u.id = $1`,
      [id]
    );
    return result.rows[0] || null;
  }
  static async getUserRole(
    userId: string
  ): Promise<Role & { permissions: Permission[] }> {
    const result = await db.query(
      `SELECT r.*, json_agg(
         DISTINCT jsonb_build_object(
           'id', p.id,
           'name', p.name,
           'description', p.description
         )
       ) as permissions
       FROM users u
       JOIN roles r ON u.role_id = r.id
       LEFT JOIN role_permissions rp ON r.id = rp.role_id
       LEFT JOIN permissions p ON rp.permission_id = p.id
       WHERE u.id = $1
       GROUP BY r.id`,
      [userId]
    );

    if (!result.rows[0]) {
      throw new Error("User role not found");
    }

    return {
      ...result.rows[0],
      permissions: (result.rows[0].permissions || []).filter(
        (p: Permission | null) => p !== null
      ),
    };
  }
}
