const bcrypt = require("bcrypt");
import { AppDataSource } from "../../data-source";
import { Users } from "../../entity/User";

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
  