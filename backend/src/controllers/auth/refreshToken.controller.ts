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

export const refreshAccessToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    const accessToken = req.cookies.accessToken;
  
    if (!refreshToken) {
      return res.status(403).send("Refresh token not found");
    }
  
    if (accessToken) {
      try {
        const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
        const dbUser = await AppDataSource.getRepository(Users).findOne({
          where: { id: decoded.sub },
        });
  
        if (dbUser) {
          const { password: _, ...userWithoutPassword } = dbUser;
          return res.status(200).json({ user: userWithoutPassword });
        }
      } catch (err) {
        console.log("Access token invalid, refreshing...");
      }
    }
  
    try {
      const tokenInDb = await AppDataSource.getRepository(RefreshTokens).findOne({
        where: { token: refreshToken },
      });
  
      if (!tokenInDb) {
        return res.status(403).send("Invalid refresh token");
      }
  
      if (tokenInDb.expiresAt < new Date()) {
        return res.status(403).send("Refresh token has expired");
      }
  
      jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET,
        async (err, user) => {
          if (err) {
            return res.status(403).send("Invalid refresh token");
          }
  
          const dbUser = await AppDataSource.getRepository(Users).findOne({
            where: { id: user.sub },
          });
  
          if (!dbUser) {
            return res.status(404).send("User not found");
          }
  
          const { password: _, ...userWithoutPassword } = dbUser;
          const newAccessToken = generateAccessToken(userWithoutPassword);
  
          res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 15 * 60 * 1000,
          });
  
          res.status(200).send({ user: userWithoutPassword });
        }
      );
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "Internal Server Error" });
    }
  };