import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Favorites } from "./Favorites";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  authors: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ unique: true, nullable: true })
  isbn: string;

  @Column({ nullable: true })
  thumbnail: string;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  pdfUrl: string;

  @Column({ nullable: true })
  fileSize: number;

  @Column({ nullable: true })
  downloadLink: string;

  @Column({ default: false })
  readable: boolean;

  @Column({ default: false })
  isFeatured: boolean;

  @Column({ nullable: true })
  publisher: string; 

  @Column({ nullable: true })
  pageCount: number; 

  @Column({ type: "float", nullable: true })
  averageRating: number; 

  @Column({ nullable: true })
  ratingsCount: number; 
  
  @OneToMany(() => Favorites, (favorite) => favorite.book)
  favorites: Favorites[];
}
