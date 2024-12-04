import "reflect-metadata";
import express from "express";
import cors from "cors"; // Importe o pacote cors
import { AppDataSource } from "./database/data-source";
import routes from "./routes";
import * as dotenv from "dotenv";
dotenv.config();


const app = express();

// Configure o CORS
app.use(cors({
  origin: "http://localhost:3001", // Permita apenas o frontend
  methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
  allowedHeaders: ["Content-Type", "Authorization"], // Cabeçalhos permitidos
}));

app.use(express.json());
app.use("/api", routes);

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected!");
    app.listen(3000, () => console.log("Server running on port 3000"));
  })
  .catch((error) => console.log(error));


  