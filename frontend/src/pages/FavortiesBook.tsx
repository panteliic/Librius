import { BookCard } from "@/components/Books/BookCard";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface Book {
  id: number;
  title: string;
  authors: string;
  description: string;
  category: string;
  thumbnail: string | null;
  isFavorite: boolean;
}

function Favorites() {
  const [books, setBooks] = useState<Book[]>([]);
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    const fetchFavoriteBooks = async () => {
      if (!user) return;

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/favorites`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        const result = await response.json();
        setBooks(result.favoriteBooks || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchFavoriteBooks();
  }, [user]);

  const handleFavoriteToggle = (bookId: number) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
  };

  return (
    <div className="flex justify-start gap-2 flex-wrap h-full  overflow-y-auto ScrollBar p-5 pb-20">
      {books.length > 0 ? (
        books.map((book) => (
          <BookCard key={book.id} {...book} onFavoriteToggle={handleFavoriteToggle} />
        ))
      ) : (
        <p className="text-muted-foreground text-center w-full">
          You have no favorite books yet.
        </p>
      )}
    </div>
  );
}

export default Favorites;
