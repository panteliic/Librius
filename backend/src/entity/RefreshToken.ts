import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class RefreshTokens {
  @PrimaryGeneratedColumn()
  id: number; 

  @Column("int")
  userId: number; 

  @Column("text")
  token: string; 

  @CreateDateColumn()
  createdAt: Date; 

  @Column("timestamp")
  expiresAt: Date; 
}
