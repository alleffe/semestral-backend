import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ShoppingList } from "./ShoppingList";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => ShoppingList, (shoppingList) => shoppingList.user)
  shoppingLists!: ShoppingList[];
}
