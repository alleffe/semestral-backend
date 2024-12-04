import { UserRepository } from "../repositories/UserRepository";
import { User } from "../models/User";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: number): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async createUser(data: Partial<User>): Promise<User> {
    return this.userRepository.create(data);
  }

  async updateUser(id: number, data: Partial<User>): Promise<User | null> {
    return this.userRepository.update(id, data);
  }

  async deleteUser(id: number): Promise<boolean> {
    return this.userRepository.delete(id);
  }
}
