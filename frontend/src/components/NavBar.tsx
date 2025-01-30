import { Input } from "./ui/input";

export default function NavBar() {
  return (
    <div className="border-[#00000011] border-b-2 px-5 py-3 flex justify-between items-center h-16">
      <div className="text-muted-foreground bg-accent flex items-center p-1 rounded-md ">
        <svg
          width="5%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 21L16.65 16.65M11 6C13.7614 6 16 8.23858 16 11M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <Input
          type="text"
          placeholder="Search book..."
          className="border-0 border-secondary focus-visible:outline-none focus-visible:ring-0 text-accent-foreground shadow-none w-4/5"
        />

      </div>
    </div>
  );
}
