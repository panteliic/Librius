import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { BookCard } from "./BookCard";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface Book {
  id: number;
  title: string;
  authors: string;
  description: string;
  category: string;
  thumbnail: string | null;
  isFavorite: boolean;
}

function FeaturedBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const user = useSelector((state: RootState) => state.user.user);
  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      try {
        const userId = user?.id || 0; 
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/featured-books/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        const result = await response.json();
        setBooks(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (user !== undefined) {
      fetchFeaturedBooks();
    }
  }, [user]);

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
