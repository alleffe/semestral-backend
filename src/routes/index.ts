// import { Router } from "express";
// import { AuthController } from "../controllers/AuthController";
// import userRoutes from "./userRoutes";
// import shoppingListRoutes from "./shoppingListRoutes";
// import itemRoutes from "./itemRoutes";


// const routes = Router();
// const authController = new AuthController();

// routes.use("/shopping-lists", shoppingListRoutes);
// routes.use("/users", userRoutes);
// routes.use("/items", itemRoutes);
// // Envolva o método em uma função middleware
// routes.post("/login", async (req, res, next) => {
//   try {
//     await authController.login(req, res);
//   } catch (error) {
//     next(error); // Passa o erro para o middleware de tratamento de erros
//   }
// });

// export default routes;
import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import userRoutes from "./userRoutes";
import shoppingListRoutes from "./shoppingListRoutes";
import itemRoutes from "./itemRoutes";
import { authMiddleware } from "../middleware/authMiddleware";

const routes = Router();
const authController = new AuthController();

// Rota de login
routes.post("/login", async (req, res, next) => {
  try {
    await authController.login(req, res);
  } catch (error) {
    next(error);
  }
});

// Aplicação do middleware de autenticação para todas as rotas protegidas
routes.use(authMiddleware);

// Rotas protegidas
routes.use("/users", userRoutes);
routes.use("/shopping-lists", shoppingListRoutes);
routes.use("/items", itemRoutes);

export default routes;
