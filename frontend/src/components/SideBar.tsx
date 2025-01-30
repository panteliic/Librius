import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  BookmarkIcon,
  ChevronIcon,
  CompassIcon,
  GearIcon,
  HomeIcon,
  LayoutLeftIcon,
  LoginIcon,
  LogoutIcon,
  UserProfileIcon,
} from "@/main";
import { motion } from "framer-motion";

function SideBar() {
  const menuItems = [
    { icon: <HomeIcon />, text: "Home", link: "/" },
    { icon: <CompassIcon />, text: "Library", link: "/library" },
    { icon: <BookmarkIcon />, text: "Favorites", link: "/favorites" },
    { icon: <GearIcon />, text: "Settings", link: "/settings" },
  ];
  const user = null;
  const [visibleText, setVisibleText] = useState(window.innerWidth >= 768);
  const [sidebarWidth, setSidebarWidth] = useState("20%");

  useEffect(() => {
    const updateWidth = () => {

      setSidebarWidth(
        window.innerWidth < 640
          ? visibleText
          ? "100%"
          : "5rem"
          : window.innerWidth < 1280
          ? visibleText
            ? "36%"
            : "5rem"
          : visibleText
          ? "20%"
          : "5rem"
      );
    };
    window.addEventListener("resize", updateWidth);
    updateWidth();
    return () => window.removeEventListener("resize", updateWidth);
  }, [visibleText]);

  return (
    <motion.div
      animate={{ width: sidebarWidth }}
      className={`h-screen flex flex-col justify-between border-r-2 border-[#00000011] overflow-hidden ${visibleText && " absolute bg-background md:relative"}`}
    >
      <div className="flex flex-col gap-9">
        <div
          className={`border-b-2 border-[#00000011] px-5 py-3 flex justify-between items-center h-16 ${
            !visibleText && "justify-center"
          }`}
        >
          <a
            href="/"
            className={`text-3xl text-primary font-bold ${
              !visibleText && "hidden"
            }`}
          >
            Librius.
          </a>
          <button
            onClick={() => setVisibleText(!visibleText)}
            className={`${!visibleText && "w-full"}`}
          >
            <LayoutLeftIcon className="w-full" />
          </button>
        </div>
        <ul className="flex flex-col gap-5 px-3 items-center">
          {menuItems.map(({ icon, text, link }, index) => (
            <li key={index} className="w-full">
              <a
                href={link}
                className="flex items-center justify-start p-2 rounded-md text-foreground hover:bg-primary hover:text-primary-foreground transition duration-300 w-full"
              >
                {icon}
                {visibleText && <span className="ml-4 text-xl">{text}</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t-2 border-[#00000011] p-3 flex items-center">
        {!user ? (
          <Popover>
            <PopoverTrigger
              className={`flex items-center justify-between gap-3 cursor-pointer w-full ${
                !visibleText && "justify-center"
              }`}
            >
              <div
                className={`flex items-center gap-1 ${
                  !visibleText && "justify-center w-full"
                }`}
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    NP
                  </AvatarFallback>
                </Avatar>
                {visibleText && <p>Nikola Pantelic</p>}
              </div>
              {visibleText && <ChevronIcon />}
            </PopoverTrigger>
            <PopoverContent className="flex flex-col border-[#00000020] p-2">
              <button className="p-2 flex gap-3">
                <UserProfileIcon /> Profile
              </button>
              <div className="w-full border-b-2 border-[#00000011]" />
              <button className="p-2 flex gap-3">
                <LogoutIcon /> Log out
              </button>
            </PopoverContent>
          </Popover>
        ) : (
          <button className="p-3 flex items-center gap-3 justify-start">
            <LoginIcon />
            {visibleText && <span>Sign in</span>}
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default SideBar;
