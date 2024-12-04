// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
// import { User } from "./User";
// import { Item } from "./Item";

// @Entity()
// export class ShoppingList {
//   @PrimaryGeneratedColumn()
//   id!: number;

//   @Column()
//   title!: string;

//   @ManyToOne(() => User, (user) => user.shoppingLists)
//   user!: User;

//   @OneToMany(() => Item, (item) => item.shoppingList)
//   items!: Item[];
// }
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { User } from "./User";
import { Item } from "./Item";

@Entity("shopping_lists") // Nome correto da tabela
export class ShoppingList {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @ManyToOne(() => User, (user) => user.shoppingLists, { nullable: false })
  @JoinColumn({ name: "user_id" }) // Especifica o nome correto da coluna no banco
  user!: User;

  @OneToMany(() => Item, (item) => item.shoppingList)
  items!: Item[];
}
