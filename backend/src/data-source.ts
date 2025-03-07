import "reflect-metadata";
import { DataSource } from "typeorm";
import { Users } from "./entity/User";
import { RefreshTokens } from "./entity/RefreshToken";
import { Book } from "./entity/Books";
import { Favorites } from "./entity/Favorites";

export const AppDataSource = new DataSource({
  type: "postgres",
  host:  process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Users, RefreshTokens, Book, Favorites],
  migrations: [],
  subscribers: [],
});
