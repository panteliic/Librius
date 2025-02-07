const bcrypt = require("bcrypt");
import { AppDataSource } from "../../data-source";
import { Users } from "../../entity/User";
import { RefreshTokens } from "../../entity/RefreshToken";
import {
  generateAccessToken,
  generateRefreshToken,
  insertRefreshToken,
} from "../../auth/jwt";
const jwt = require("jsonwebtoken");

export const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await AppDataSource.createQueryBuilder()
        .select("users")
        .from(Users, "users")
        .where("users.email = :email", { email })
        .getOne();
  
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
  
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).send({ message: "Invalid password" });
      }
  
      const { password: _, ...userWithoutPassword } = user;
  
      const accessToken = generateAccessToken(userWithoutPassword);
      const refreshToken = generateRefreshToken(userWithoutPassword);
  
      insertRefreshToken(user.id, refreshToken);
  
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 15 * 60 * 1000,
      });
      res.status(200).send({ user: userWithoutPassword });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "Internal Server Error" });
    }
  };