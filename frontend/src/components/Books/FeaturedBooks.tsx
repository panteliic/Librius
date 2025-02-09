import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { BookCard } from "./BookCard";

interface Book {
  title: string;
  author: string;
  description: string;
  category: string;
  thumbnail: string | null;
}

function FeaturedBooks() {
  const [books, setBooks] = useState<Book[]>([]); 

  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/featuredBooks`
        );
        const result = await response.json();
        console.log(result);


        setBooks(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchFeaturedBooks();
  }, []);

  return (
    <div className="mb-20 flex flex-col items-start">
      <h2 className="capitalize text-5xl text-popover-foreground font-bold mb-7">
        Featured Books
      </h2>
      <div className="flex justify-start gap-2 flex-wrap">
        {books &&
          books.map((book: Book, index: number) => (
            <BookCard key={index} {...book} />
          ))}
      </div>
      <Button className="self-center mt-10">
        <a href="/library">More books...</a>
      </Button>
    </div>
  );
}

export default FeaturedBooks;
