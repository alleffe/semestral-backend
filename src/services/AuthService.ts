import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserService } from "./UserService";
import { User } from "../models/User";

export class AuthService {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async authenticate(email: string, password: string): Promise<string> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return token;
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async verifyToken(token: string): Promise<any> {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      return decoded;
    } catch (err) {
      throw new Error("Invalid or expired token");
    }
  }
}
