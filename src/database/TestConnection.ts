import { AppDataSource } from "./data-source";
import * as dotenv from "dotenv";


async function testConnection() {
    dotenv.config({ path: "./.env" }); // Caminho personalizado, se necessário

    console.log("DB_HOST:", process.env.SUPABASE_DB_HOST);
    console.log("DB_PORT:", process.env.SUPABASE_DB_PORT);
    console.log("DB_USER:", process.env.SUPABASE_DB_USER);
    console.log("DB_PASS:", process.env.SUPABASE_DB_PASS);
    console.log("DB_NAME:", process.env.SUPABASE_DB_NAME);

  try {
    await AppDataSource.initialize();
    console.log("Connection to the database established successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
}

testConnection();
