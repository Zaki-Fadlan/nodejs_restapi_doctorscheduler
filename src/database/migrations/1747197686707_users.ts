import { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable(
    "users",
    {
      id: {
        type: "uuid",
        primaryKey: true,
        notNull: true,
        default: pgm.func("gen_random_uuid()"),
      },
      name: {
        type: "varchar(255)",
        notNull: true,
      },
      username: {
        type: "varchar(255)",
        notNull: true,
        unique: true,
      },
      password: {
        type: "varchar(255)",
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

  //   add index
  pgm.createIndex("users", ["username"], {
    unique: true,
    ifNotExists: true,
  });
}
export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable("users", { ifExists: true, cascade: true });
}
