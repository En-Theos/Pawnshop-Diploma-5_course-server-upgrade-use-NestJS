import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class TabletsPrices {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  type: string;

}