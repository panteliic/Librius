import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { Users } from "./User";
import { Book } from "./Books"; 

@Entity()
export class Favorites {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.favorites)
  @JoinColumn({ name: "user_id" })
  user: Users;

  @ManyToOne(() => Book, (book) => book.favorites)
  @JoinColumn({ name: "book_id" })
  book: Book;

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;
}
