import { CameraOff, CloseIcon, MessageIcon, SearchIcon } from "@/main";
import { Input } from "./ui/input";
import { useState } from "react";
import { Link } from "react-router";

interface Book {
  id: number;
  title: string;
  authors: string;
  description: string;
  category: string;
  thumbnail: string | null;
}

export default function NavBar() {
  const [openSearch, setOpenSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const handleLink = () => {
    setSearchTerm("");
    setSearchResults([]);
    setOpenSearch(false);
    return;
  };
  const handleSearch = async (query: string) => {
    setSearchTerm(query);

    if (!query.trim()) {
      setSearchResults([]);
      setOpenSearch(false);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/search-books?query=${query}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }
      const result: Book[] = await response.json();
      setSearchResults(result.slice(0, 3));
      setOpenSearch(true);
    } catch (error) {
      console.error("Error searching books:", error);
    }
  };

  return (
    <div className="border-[#00000011] border-b-2 px-5 py-3 flex justify-between items-center h-16 relative">
      <a
        href="/"
        className={`md:hidden text-3xl text-primary font-bold ${
          openSearch && " hidden"
        }`}
      >
        Librius.
      </a>
      <div className="flex items-center gap-3 justify-end md:justify-between w-full">
        <div
          className={`w-auto bg-background flex items-center p-1 rounded-md md:w-1/2 ${
            openSearch && " w-full justify-between"
          }`}
        >
          <SearchIcon
            width={24}
            onClick={() => setOpenSearch(true)}
            className="text-foreground cursor-pointer"
          />
          <Input
            type="text"
            placeholder="Search book..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className={`border-0 border-secondary focus-visible:outline-none focus-visible:ring-0 text-accent-foreground shadow-none ${
              openSearch ? "flex w-full" : "hidden md:flex"
            }`}
          />
          <CloseIcon
            width={24}
            onClick={() => {
              setOpenSearch(false);
              setSearchTerm("");
              setSearchResults([]);
            }}
            className={`${
              openSearch ? "flex" : "hidden"
            } md:hidden cursor-pointer`}
          />
        </div>
        <a href="/chat">
          <MessageIcon width={24} />
        </a>
      </div>
      {openSearch && searchResults.length > 0 && (
        <div className="absolute top-16 left-0 w-full bg-background rounded-md p-3 z-50">
          <ul>
            {searchResults.map((book) => (
              <li
                key={book.id}
                className="p-2 border-b cursor-pointer hover:bg-gray-100 "
                onClick={handleLink}
              >
                <Link
                  to={`/books/${book.title.split(" ").join("-")}?id=${book.id}`}
                  className="w-full flex gap-3"
                >
                  {book.thumbnail ? (
                    <img
                      src={book.thumbnail}
                      alt={book.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  ) : (
                    <CameraOff className="w-16 h-16 object-cover rounded-md" />
                  )}
                  <div className="flex flex-col justify-center">
                    <span className="font-semibold">{book.title}</span>
                    <span className="text-sm text-gray-500">
                      {book.authors}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
