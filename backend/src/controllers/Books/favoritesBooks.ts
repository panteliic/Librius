import { Request, Response } from "express";
import { Favorites } from "../../entity/Favorites";
import { Users } from "../../entity/User";
import { Book } from "../../entity/Books";
import { AppDataSource } from "../../data-source";

export const favorites = async (req: Request, res: Response) => {
    const userId = (req as any).user?.id; 
  
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }
  
    try {
      const favoriteRepository = AppDataSource.getRepository(Favorites);
  
      const favorites = await favoriteRepository.find({
        where: { user: { id: userId } },
        relations: ["book"],
      });
  
      if (!favorites.length) {
        return res.status(200).json({ message: "No favorite books found", books: [] });
      }
  
      const favoriteBooks = favorites.map((fav) => ({
        ...fav.book,
        isFavorite: true, 
      }));
      
      return res.status(200).json({ favoriteBooks });
      
    } catch (error) {
      console.error("Error fetching favorites:", error);
      return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  };
  
