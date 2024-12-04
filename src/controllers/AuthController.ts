import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserService } from "../services/UserService";

export class AuthController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    try {
      // Buscar o usuário pelo email
      const user = await this.userService.getUserByEmail(email);

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Verificar a senha
      if (password !== user.password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Gerar o token JWT
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
        expiresIn: "1h",
      });

      return res.json({ token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
