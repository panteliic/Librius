import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Book } from "../../entity/Books";
import axios from "axios";

const bookRepo = AppDataSource.getRepository(Book);

const categories = [
  "fiction", "history", "science", "technology", "romance",
  "mystery", "fantasy", "biography", "philosophy", "psychology",
  "economics", "politics", "sports", "cooking", "art", "music",
  "education", "travel", "medicine", "engineering", "law", "comics",
];

const MAX_BOOKS_PER_CATEGORY = 1000;
const BOOKS_PER_PAGE = 40;

export class BookController {
  static async migrateBooks(req: Request, res: Response) {
    try {
      for (const category of categories) {
        for (let startIndex = 0; startIndex < MAX_BOOKS_PER_CATEGORY; startIndex += BOOKS_PER_PAGE) {
          const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${category}&maxResults=${BOOKS_PER_PAGE}&startIndex=${startIndex}`;
          const { data } = await axios.get(url);

          if (!data.items) break;

          const books = data.items.map((item: any) => ({
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors?.join(", ") || "Unknown",
            description: item.volumeInfo.description || "",
            isbn: item.volumeInfo.industryIdentifiers?.[0]?.identifier || "",
            thumbnail: item.volumeInfo.imageLinks?.thumbnail || "",
            category,
            pdfUrl: "",
            fileSize: 0,
            downloadLink: "",
            readable: false,
            isFeatured: false,
            publisher: item.volumeInfo.publisher || "Unknown",
            pageCount: item.volumeInfo.pageCount || null,
            averageRating: item.volumeInfo.averageRating || null,
            ratingsCount: item.volumeInfo.ratingsCount || null,
          }));

          for (const book of books) {
            const existingBook = await bookRepo.findOne({ where: { isbn: book.isbn } });
            if (!existingBook) {
              await bookRepo.save(book);
            }
          }

          console.log(`Migrirano ${books.length} knjiga iz kategorije ${category}, startIndex: ${startIndex}`);
        }
      }

      return res.json({ message: "Books migrated successfully!" });
    } catch (error) {
      console.error("Migration failed:", error);
      return res.status(500).json({ message: "Migration failed", error });
    }
  }

  static async getAllBooks(req: Request, res: Response) {
    try {
      const books = await bookRepo.find();
      return res.json(books);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching books", error });
    }
  }
}
