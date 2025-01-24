const jwt = require("jsonwebtoken");
import { AppDataSource } from "../data-source";
import { Users } from "../entity/User";
import { RefreshTokens } from "../entity/RefreshToken";
export const generateAccessToken = (payload: object): string => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, {
    expiresIn: process.env.JWT_ACCESS_EXPIRY,
  });
};

export const generateRefreshToken = (payload: object): string => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: process.env.JWT_REFRESH_EXPIRY,
  });
};
export const insertRefreshToken = async (userId: number, token: string) => {
  try {
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(RefreshTokens)
      .values({
        userId,
        token,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      })
      .execute();
  } catch (err) {
    console.log(err);
  }
};
