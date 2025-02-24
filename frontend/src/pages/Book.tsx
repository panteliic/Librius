import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

interface Book {
  id: number;
  title: string;
  authors: string;
  description: string;
  category: string;
  thumbnail: string | null;
}

const BookDetails = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
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
    <div className="flex flex-col items-center p-10 w-full h-screen">
      <button 
        onClick={() => navigate(-1)} 
        className="m-5 px-4 py-2 bg-primary text-primary-foreground rounded absolute left-10 top-1"
      >
        Back
      </button>
      {book ? (
        <div className="w-full flex items-start gap-10 px-5 mt-10">
          {book.thumbnail && (
            <img src={book.thumbnail} alt={book.title} className="w-1/5" />
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{book.title}</h1>
            <p className="text-lg text-gray-700">by {book.authors}</p>
            <p className="text-sm text-gray-500 italic">Category: {book.category}</p>
            <p className="mt-5 text-gray-800">{book.description}</p>
          </div>
        </div>
      ) : (
        <p className="text-lg font-semibold">Loading book details...</p>
      )}
    </div>
  );
};

export default BookDetails;