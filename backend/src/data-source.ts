import "reflect-metadata";
import { DataSource } from "typeorm";
import { Users } from "./entity/User";
import { RefreshTokens } from "./entity/RefreshToken";
import { Book } from "./entity/Books";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "password123",
  database: "Librius",
  synchronize: true,
  logging: false,
  entities: [Users, RefreshTokens, Book],
  migrations: [],
  subscribers: [],
});
