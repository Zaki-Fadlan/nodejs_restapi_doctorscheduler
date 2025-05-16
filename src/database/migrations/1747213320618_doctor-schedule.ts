import { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable(
    "doctor_schedules",
    {
      id: {
        type: "uuid",
        primaryKey: true,
        notNull: true,
        default: pgm.func("gen_random_uuid()"),
      },
      doctor_id: {
        type: "uuid",
        notNull: true,
        references: "users(id)",
        onDelete: "CASCADE",
      },
      day: {
        type: "varchar(255)",
        notNull: true,
      },
      time_start: {
        type: "time",
        notNull: true,
      },
      time_finish: {
        type: "time",
        notNull: true,
      },
      quota: {
        type: "integer",
        notNull: true,
      },
      status: {
        type: "boolean",
        notNull: true,
        default: true,
      },
      date: {
        type: "timestamp",
        notNull: true,
      },
    },
    { ifNotExists: true }
  );
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable("doctor_schedules", { ifExists: true, cascade: true });
}
