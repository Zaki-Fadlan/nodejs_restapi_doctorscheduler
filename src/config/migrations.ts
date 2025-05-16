import dotenv from "dotenv";
import { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

dotenv.config();

const dbConfig = {
  connectionString: process.env.DATABASE_URL,
  schema: "public",
  migrationsTable: "migrations",
  dir: "src/database/migrations",
};

export default dbConfig;

export interface MigrationConfig {
  shorthands?: ColumnDefinitions;
  up: (pgm: MigrationBuilder) => Promise<void>;
  down: (pgm: MigrationBuilder) => Promise<void>;
}
