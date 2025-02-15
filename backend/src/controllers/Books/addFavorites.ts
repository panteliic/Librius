import { Request, Response } from "express";
import { Favorites } from "../../entity/Favorites";
import { Users } from "../../entity/User";
import { Book } from "../../entity/Books";
import { AppDataSource } from "../../data-source";

export const addFavorite = async (req: Request, res: Response) => {
  const { bookId } = req.body;
  const userId = (req as any).user.id 
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized: User not found" });
  }

  try {
    const favoriteRepository = AppDataSource.getRepository(Favorites);
    const userRepository = AppDataSource.getRepository(Users);
    const bookRepository = AppDataSource.getRepository(Book);

    const user = await userRepository.findOne({ where: { id: userId } });
    const book = await bookRepository.findOne({ where: { id: bookId } });

    if (!user || !book) {
      return res.status(404).json({ message: "User or book not found" });
    }


    const existingFavorite = await favoriteRepository.findOne({
      where: { user: user, book: book },
    });

    if (existingFavorite) {
      return res.status(400).json({ message: "Book already in favorites" });
    }

    const favorite = favoriteRepository.create({ user, book });
    await favoriteRepository.save(favorite);

    return res.status(201).json({ message: "Book added to favorites" });
  } catch (error) {
    console.error("Error adding favorite:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
