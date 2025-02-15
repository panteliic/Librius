import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface Book {
  id: number;
  title: string;
  authors: string;
  description: string;
  category: string;
  thumbnail: string | null;
}

const Book = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [book, setBook] = useState<Book | null>(null); 
  
  useEffect(() => {
    if (!id) return; 

    const fetchBook = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/book-info/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch book");
        }

        const result = await response.json();
        setBook(result);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };

    fetchBook();
  }, [id]); 

  return (
    <div className="flex items-center h-2/3 w-full">
      {book ? (
        <div className="flex gap-10 px-5 w-full items-start ">
          {book.thumbnail && <img src={book.thumbnail} alt={book.title} className=" w-1/5 "/>}
          <div className="w-2/3 relative">
            <h1 className="text-popover-foreground text-5xl font-bold">{book.title}</h1>
            <p className="text-xl">{book.authors}</p>
            <p className="mt-5 text-lg font-normal">{book.description}</p>
            
          </div>
        </div>
      ) : (
        <p>Loading book details...</p>
      )}
    </div>
  );
};

export default Book;
