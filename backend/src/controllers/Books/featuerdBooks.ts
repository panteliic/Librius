import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Book } from "../../entity/Books";

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
};

export const getFeaturedBooks = async (req: Request, res: Response) => {
  try {
    const bookRepository = AppDataSource.getRepository(Book);
    const featuredBooks = await bookRepository.find({
      where: { isFeatured: true },
      take: 10,
    });

    return res.status(200).json(featuredBooks);
  } catch (error) {
    console.error("Error fetching featured books:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
