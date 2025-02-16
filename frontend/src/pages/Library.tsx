import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { BookCard } from "@/components/Books/BookCard";
interface Book {
  id: number;
  title: string;
  authors: string;
  description: string;
  category: string;
  thumbnail: string | null;
  isFavorite: boolean;
}
function Library() {
  const [books, setBooks] = useState<Book[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const fetchBooks = async (pageNumber: number) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/books?page=${pageNumber}`
      );
      if (!res.ok) throw new Error("Neuspešno učitavanje knjiga");

      const data = await res.json();
      setBooks(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBooks(page);
    const container = document.getElementById("libraryContainer");
    if (container) {
      container.scrollTo({ top: 0 });
    }
  }, [page]);

  const changePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setSearchParams({ page: newPage.toString() });
  };

  return (
    <div
      className="h-full overflow-y-auto ScrollBar p-5 pb-20"
      id="libraryContainer"
    >
      <div className="flex justify-start gap-2 flex-wrap  ">
        {books.length > 0 ? (
          books.map((book) => <BookCard key={book.id} {...book} />)
        ) : (
          <p className="text-center col-span-4">Books not found</p>
        )}
      </div>
      <Pagination className="mt-6 flex justify-center">
        <PaginationContent>
          <PaginationItem className="cursor-pointer">
            <PaginationPrevious onClick={() => changePage(page - 1)} />
          </PaginationItem>
          <PaginationItem className="cursor-pointer">
            <PaginationLink
              onClick={() => changePage(1)}
              className={page === 1 ? "font-bold text-blue-500" : ""}
            >
              1
            </PaginationLink>
          </PaginationItem>

          {page >= 4 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {Array.from({ length: 3 }, (_, i) => page - 1 + i)
            .filter((num) => num > 1 && num < totalPages)
            .map((pageNumber) => (
              <PaginationItem key={pageNumber} className="cursor-pointer">
                <PaginationLink
                  onClick={() => changePage(pageNumber)}
                  className={
                    page === pageNumber ? "font-bold text-blue-500" : ""
                  }
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            ))}

          {page < totalPages - 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem className="cursor-pointer">
            <PaginationLink
              onClick={() => changePage(totalPages)}
              className={page === totalPages ? "font-bold text-blue-500" : ""}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem className="cursor-pointer">
            <PaginationNext onClick={() => changePage(page + 1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default Library;
