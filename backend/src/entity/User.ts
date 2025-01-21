import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar", { length: 45 })
    firstName: string

    @Column("varchar", { length: 45 })
    lastName: string

    @Column("varchar", { length: 60 })
    email: string

    @Column("varchar", { length: 25 })
    password: string

    @Column("varchar", { length: 256 })
    profileImage:string



}
