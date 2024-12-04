import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config({ path: "./.env" }); // Caminho personalizado, se necessário

// export const AppDataSource = new DataSource({
//   type: "postgres",
//   host: process.env.SUPABASE_DB_HOST,
//   port: Number(process.env.SUPABASE_DB_PORT),
//   username: process.env.SUPABASE_DB_USER,
//   password: process.env.SUPABASE_DB_PASS,
//   database: process.env.SUPABASE_DB_NAME,
//   synchronize: true,
//   entities: ["src/models/*.ts"],
//   ssl: { rejectUnauthorized: false }, // Adicione esta configuração
//   logging: ["query", "error"],
// });

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.SUPABASE_DB_HOST,
  port: Number(process.env.SUPABASE_DB_PORT),
  username: process.env.SUPABASE_DB_USER,
  password: process.env.SUPABASE_DB_PASS,
  database: process.env.SUPABASE_DB_NAME,
  synchronize: false, // Desative a sincronização automática
  entities: ["src/models/*.ts"],
  ssl: { rejectUnauthorized: false },
  logging: ["query", "error"],
});
