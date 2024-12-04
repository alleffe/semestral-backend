import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.userService.getAllUsers();
      return res.json(users);
    } catch (error) {
      // Tratando o erro para garantir que seja do tipo Error
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "Unknown error occurred" });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.userService.getUserById(parseInt(req.params.id, 10));
      if (!user) return res.status(404).json({ message: "User not found" });
      return res.json(user);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "Unknown error occurred" });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password } = req.body;
      const user = await this.userService.createUser({ name, email, password });
      return res.status(201).json(user);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "Unknown error occurred" });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;

      const user = await this.userService.updateUser(parseInt(id, 10), { name, email, password });
      if (!user) return res.status(404).json({ message: "User not found" });
      return res.json(user);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "Unknown error occurred" });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const deleted = await this.userService.deleteUser(parseInt(req.params.id, 10));
      if (!deleted) return res.status(404).json({ message: "User not found" });
      return res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "Unknown error occurred" });
    }
  }
}
