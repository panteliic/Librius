import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Book } from "../../entity/Books";
import { Favorites } from "../../entity/Favorites";

export const getBooks = async (req: Request, res: Response) => {
  try {
    const bookRepository = AppDataSource.getRepository(Book);
    const favoriteRepository = AppDataSource.getRepository(Favorites);
    
    const userId = Number(req.params.userId);
    

    let page = parseInt(req.query.page as string) || 1;
    let limit = 48;
    let skip = (page - 1) * limit;

    const [books, total] = await bookRepository.findAndCount({
      skip,
      take: limit,
      order: { id: "ASC" },
    });

    let userFavorites: number[] = [];

    if (!isNaN(userId)) {
      const favorites = await favoriteRepository.find({
        where: { user: { id: userId } },
        relations: ["book"],
      });

      userFavorites = favorites.map((fav) => fav.book?.id).filter(Boolean);
    }

    const booksWithFavorites = books.map((book) => ({
      ...book,
      isFavorite: userFavorites.includes(book.id),
    }));

    res.json({
      totalBooks: total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data: booksWithFavorites,
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
