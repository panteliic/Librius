import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Favorites } from "./Favorites";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 45 })
  firstName: string;

  @Column("varchar", { length: 45 })
  lastName: string;

  @Column("varchar", { length: 60 })
  email: string;

  @Column("varchar", { length: 256 })
  password: string;

  @Column("varchar", { length: 256, nullable: true })
  profileImage: string;
  
  @OneToMany(() => Favorites, (favorite) => favorite.user)
  favorites: Favorites[];
}
