import { Request, Response } from "express";
import { Favorites } from "../../entity/Favorites";
import { Users } from "../../entity/User";
import { Book } from "../../entity/Books";
import { AppDataSource } from "../../data-source";


export const addFavorite = async (req: Request, res: Response) => {
  const { bookId, userId } = req.body;

  try {
    const favoriteRepository = AppDataSource.getRepository(Favorites);
    const userRepository = AppDataSource.getRepository(Users);
    const bookRepository = AppDataSource.getRepository(Book);

    const user = await userRepository.findOne(userId);
    const book = await bookRepository.findOne(bookId);

    if (!user || !book) {
      return res.status(404).json({ message: "User or book not found" });
    }

    const favorite = new Favorites();
    favorite.user = user;
    favorite.book = book;

    await favoriteRepository.save(favorite);
    return res.status(201).json({ message: "Book added to favorites" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
