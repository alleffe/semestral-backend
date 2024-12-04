import { AppDataSource } from "../database/data-source";
import { User } from "../models/User";

export class UserRepository {
  private repository = AppDataSource.getRepository(User);

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<User | null> {
    return this.repository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOneBy({ email });
  }

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.repository.create(user);
    return this.repository.save(newUser);
  }

  async update(id: number, user: Partial<User>): Promise<User | null> {
    const existingUser = await this.findById(id);
    if (!existingUser) return null;
    Object.assign(existingUser, user);
    return this.repository.save(existingUser);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }
}
