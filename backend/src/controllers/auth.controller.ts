const bcrypt = require("bcrypt");
import { AppDataSource } from "../data-source";
import { Users } from "../entity/User";
import { RefreshTokens } from "../entity/RefreshToken";
import {
  generateAccessToken,
  generateRefreshToken,
  insertRefreshToken,
} from "../auth/jwt";
const jwt = require("jsonwebtoken");

export const register = async (req, res) => {
  const { firstName, lastName, email, password, profileImage } = req.body;
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashPass = bcrypt.hashSync(password, salt);

  try {
    const existingUser = await AppDataSource.getRepository(Users)
      .createQueryBuilder("user")
      .where("user.email = :email", { email })
      .getOne();

    if (existingUser) {
      return res.status(400).send({ message: "Email already exists" });
    }

    await AppDataSource.createQueryBuilder()
      .insert()
      .into(Users)
      .values({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashPass,
        profileImage: profileImage,
      })
      .execute();

    res.status(200).send({ message: "User created" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

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
};export const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  try {
    if (refreshToken) {
      await AppDataSource.getRepository(RefreshTokens).delete({
        token: refreshToken,
      });
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.status(200).send({ message: "Logged out successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const protectedRoute = async (req, res) => {
  res.status(200).send(true);
};
