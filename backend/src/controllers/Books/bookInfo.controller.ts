import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Book } from "../../entity/Books";

export const bookInfo = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    const books = AppDataSource.getRepository(Book);
    const book = await books.findOne({ where: { id } });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json(book);
  } catch (error) {
    console.error("Error fetching book:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
