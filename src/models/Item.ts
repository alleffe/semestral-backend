// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
// import { ShoppingList } from "./ShoppingList";

// @Entity()
// export class Item {
//   @PrimaryGeneratedColumn()
//   id!: number;

//   @Column()
//   name!: string;

//   @Column()
//   quantity!: number;

//   @ManyToOne(() => ShoppingList, (list) => list.items)
//   shoppingList!: ShoppingList;
// }
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { ShoppingList } from "./ShoppingList";

@Entity("items")
export class Item {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column("int")
  quantity!: number;

  // @ManyToOne(() => ShoppingList, (shoppingList) => shoppingList.items, { nullable: false, onDelete: "CASCADE" })
  // @JoinColumn({ name: "shopping_list_id" })
  // shoppingList!: ShoppingList;

  @ManyToOne(() => ShoppingList, (shoppingList) => shoppingList.items, { nullable: false })
  @JoinColumn({ name: "shopping_list_id" })
  shoppingList!: ShoppingList;

}