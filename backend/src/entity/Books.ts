import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

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
}