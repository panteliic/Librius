import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Favorites } from "../../entity/Favorites";

export const removeFavorite = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id; 
      const { bookId } = req.body;
  
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized: User not found" });
      }
  
      const favoriteRepository = AppDataSource.getRepository(Favorites);
  
      const favorite = await favoriteRepository.findOne({
        where: { user: { id: userId }, book: { id: bookId } },
      });
  
      if (!favorite) {
        return res.status(404).json({ message: "Favorite book not found" });
      }
  
      await favoriteRepository.remove(favorite);
  
      return res.status(200).json({ message: "Book removed from favorites" });
    } catch (error) {
      console.error("Error removing favorite:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
  