import { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable(
    "roles",
    {
      id: {
        type: "serial",
        primaryKey: true,
        notNull: true,
      },
      name: {
        type: "varchar(50)",
        notNull: true,
      },
      description: {
        type: "text",
        notNull: true,
      },
      created_at: {
        type: "timestamp",
        notNull: true,
        default: pgm.func("current_timestamp"),
      },
      updated_at: {
        type: "timestamp",
        notNull: true,
        default: pgm.func("current_timestamp"),
      },
    },
    { ifNotExists: true }
  );

  pgm.createTable(
    "permissions",
    {
      id: {
        type: "serial",
        primaryKey: true,
        notNull: true,
      },
      name: {
        type: "varchar(50)",
        notNull: true,
      },
      description: {
        type: "text",
        notNull: true,
      },
      created_at: {
        type: "timestamp",
        notNull: true,
        default: pgm.func("current_timestamp"),
      },
      updated_at: {
        type: "timestamp",
        notNull: true,
        default: pgm.func("current_timestamp"),
      },
    },
    { ifNotExists: true }
  );
  pgm.createTable(
    "role_permissions",
    {
      role_id: {
        type: "integer",
        notNull: true,
        references: '"roles"',
        onDelete: "CASCADE",
      },
      permission_id: {
        type: "integer",
        notNull: true,
        references: '"permissions"',
        onDelete: "CASCADE",
      },
      created_at: {
        type: "timestamp",
        notNull: true,
        default: pgm.func("current_timestamp"),
      },
    },
    { ifNotExists: true }
  );
  pgm.addConstraint("role_permissions", "role_permissions_pkey", {
    primaryKey: ["role_id", "permission_id"],
  });
  pgm.addColumn("users", {
    role_id: {
      type: "integer",
      notNull: true,
      references: '"roles"',
      onDelete: "SET NULL",
    },
  });
  pgm.createIndex("roles", "name");
  pgm.createIndex("permissions", "name");
  pgm.createIndex("role_permissions", ["role_id", "permission_id"]);

  // Insert default roles
  pgm.sql(
    `INSERT INTO roles (name, description) VALUES
    ('admin', 'Administrator role with all permissions'),
    ('doctor', 'Regular user role with limited permissions'),
    ('nurse', 'Regular user role with limited permissions'),
    ('receptionist', 'Regular user role with limited permissions'),
    ('patient', 'Regular user role with limited permissions'),
    ('guest', 'Guest role with minimal permissions')`
  );

  // Insert default permissions
  pgm.sql(
    "INSERT INTO permissions (name, description) VALUES ('view:schedule', 'Can view schedule'), ('manage:users', 'Can manage users'), ('manage:roles', 'Can manage roles and permissions'), ('manage:schedule', 'Can manage doctor schedule and permissions')"
  );
  // Assign permissions to roles
  // Admin role permissions (all permissions)
  pgm.sql(
    "INSERT INTO role_permissions (role_id, permission_id) SELECT r.id, p.id FROM roles r, permissions p WHERE r.name = 'admin'"
  );
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  // Remove role_id from users first
  pgm.dropColumns("users", ["role_id"], { ifExists: true, cascade: true });

  // Drop tables in reverse order
  pgm.dropTable("role_permissions", { ifExists: true, cascade: true });
  pgm.dropTable("permissions", { ifExists: true, cascade: true });
  pgm.dropTable("roles", { ifExists: true, cascade: true });
}
