import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Book } from "../../entity/Books";


export const getBooks = async (req: Request, res: Response) => {
    const bookRepository = AppDataSource.getRepository(Book);
    
    let page = parseInt(req.query.page as string) || 1;
    let limit = 48; 
    let skip = (page - 1) * limit;

    const [books, total] = await bookRepository.findAndCount({
        skip,
        take: limit,
        order: { id: "ASC" }, 
    });

    res.json({
        totalBooks: total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        data: books,
    });
};
