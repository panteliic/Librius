import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Book } from "../../entity/Books";
import { Favorites } from "../../entity/Favorites";

export const updateFeaturedBooks = async () => {
  try {
    const bookRepository = AppDataSource.getRepository(Book);

    await bookRepository.update({}, { isFeatured: false });

    const selectedBooks = await bookRepository
      .createQueryBuilder("book")
      .where("book.thumbnail != :thumbnail", { thumbnail: "" })
      .orderBy("RANDOM()")
      .take(8)
      .getMany();

    await Promise.all(
      selectedBooks.map((book) => {
        book.isFeatured = true;
        return bookRepository.save(book);
      })
    );

    console.log(
      `[CRON] ${selectedBooks.length} books have been set as featured at 00:00.`
    );
  } catch (error) {
    console.error("[CRON] Error setting random featured books:", error);
  }
};export const getFeaturedBooks = async (req: Request, res: Response) => {
  try {
    const bookRepository = AppDataSource.getRepository(Book);
    const userId = Number(req.params.userId);

    const featuredBooks = await bookRepository
      .createQueryBuilder("book")
      .leftJoinAndSelect("book.favorites", "favorite")
      .leftJoinAndSelect("favorite.user", "user")
      .where("book.isFeatured = :isFeatured", { isFeatured: true })
      .take(10)
      .getMany();

    const booksWithFavorites = featuredBooks.map((book) => ({
      ...book,
      isFavorite: book.favorites.some((fav) => fav.user?.id === userId),
    }));

    return res.status(200).json(booksWithFavorites);
  } catch (error) {
    console.error("Error fetching featured books:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
