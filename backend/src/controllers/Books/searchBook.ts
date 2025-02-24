import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Book } from "../../entity/Books";

export const searchBooks = async (req: Request, res: Response) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    const bookRepository = AppDataSource.getRepository(Book);

    const books = await bookRepository
      .createQueryBuilder("book")
      .where("LOWER(book.title) LIKE :query", { query: `%${query}%` })
      .getMany();

    return res.json(books);
  } catch (error) {
    console.error("Error searching books:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
