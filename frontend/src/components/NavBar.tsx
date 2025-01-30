import { CloseIcon, MessageIcon, SearchIcon } from "@/main";
import { Input } from "./ui/input";
import { useState } from "react";

export default function NavBar() {
  const [openSearch, setOpenSearch] = useState(false);
  return (
    <div className="border-[#00000011] border-b-2 px-5 py-3 flex justify-between items-center h-16">
      <a
        href="/"
        className={`md:hidden text-3xl text-primary font-bold ${
          openSearch && " hidden"
        } `}
      >
        Librius.
      </a>
      <div className="flex items-center gap-3 justify-end md:justify-between w-full">
        <div
          className={`w-auto bg-background flex items-center p-1 rounded-md  md:w-1/2  ${
            openSearch && " w-[100%] justify-between"
          } `}
        >
          <SearchIcon
            width={24}
            onClick={() => setOpenSearch(true)}
            className="text-foreground"
          />
          <Input
            type="text"
            placeholder="Search book..."
            className={`border-0 border-secondary focus-visible:outline-none focus-visible:ring-0 text-accent-foreground shadow-none ${
              openSearch ? "flex" : "hidden md:flex"
            }`}
          />
          <CloseIcon
            width={24}
            onClick={() => setOpenSearch(false)}
            className={`${openSearch ? "flex" : "hidden"} md:hidden`}
          />
        </div>
        <a href="/chat">
          <MessageIcon width={24} />
        </a>
      </div>
    </div>
  );
}
