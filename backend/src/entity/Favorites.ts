import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, Unique } from "typeorm";
import { Users } from "./User";
import { Book } from "./Books"; 

@Entity()
@Unique(["user", "book"])
export class Favorites {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.favorites, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: Users;

  @ManyToOne(() => Book, (book) => book.favorites, { onDelete: "CASCADE" })
  @JoinColumn({ name: "book_id" })
  book: Book;

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;
}
