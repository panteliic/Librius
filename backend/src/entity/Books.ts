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
}
