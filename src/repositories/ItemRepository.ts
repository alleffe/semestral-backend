import { AppDataSource } from "../database/data-source";
import { Item } from "../models/Item";

export class ItemRepository {
  private repository = AppDataSource.getRepository(Item);

  async findAll(): Promise<Item[]> {
    return this.repository.find({
      relations: ["shoppingList"], // Inclui relações se necessário
    });
  }

  async findById(id: number): Promise<Item | null> {
    return this.repository.findOne({
      where: { id },
      relations: ["shoppingList"],
    });
  }

  // async create(data: Partial<Item>): Promise<Item> {
  //   const item = this.repository.create(data);
  //   return this.repository.save(item);
  // }

  async create(data: Partial<Item>): Promise<Item> {
    const item = this.repository.create(data);
    return this.repository.save(item);
  }

  async update(id: number, data: Partial<Item>): Promise<Item | null> {
    const item = await this.findById(id);
    if (!item) return null;

    Object.assign(item, data);
    return this.repository.save(item);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }
}
