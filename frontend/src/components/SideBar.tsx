import { useSelector } from "react-redux";
import { RootState } from "../store/store";
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
  HomeIcon,
  LayoutLeftIcon,
  LoginIcon,
  LogoutIcon,
  UserProfileIcon,
} from "@/main";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLogoutMutation } from "../store/apiSlice";
import { Link } from "react-router";

function SideBar() {
  const user = useSelector((state: RootState) => state.user.user);
  const [logout] = useLogoutMutation();

  const menuItems = [
    { icon: <HomeIcon />, text: "Home", link: "/" },
    { icon: <CompassIcon />, text: "Library", link: "/library" },
    { icon: <BookmarkIcon />, text: "Favorites", link: "/favorites" },
  ];
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

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <motion.div
      animate={{ width: sidebarWidth }}
      className={`bg-background h-screen flex flex-col justify-between border-r-2 border-[#00000011] overflow-hidden ${
        visibleText && " z-50 absolute bg-background md:relative"
      }`}
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
            <li key={index} className="w-full ">
              <a
                href={link}
                className={`flex items-center justify-start p-2 rounded-md text-foreground hover:bg-primary hover:text-primary-foreground transition duration-300 w-full ${
                  !visibleText && "justify-center"
                }`}
              >
                {icon}
                {visibleText && <span className="ml-4 text-xl">{text}</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t-2 border-[#00000011] p-3 flex items-center">
        {user ? (
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
                <Avatar className="w-8 h-8 rounded">
                  <AvatarImage
                    src={user.profileImage ? user.profileImage : ""}
                    className=" rounded-md"
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground rounded-md">
                    {user.firstName[0].toUpperCase()}
                    {user.lastName[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {visibleText && (
                  <span>
                    {user?.firstName} {user?.lastName}
                  </span>
                )}
              </div>
              {visibleText && <ChevronIcon />}
            </PopoverTrigger>
            <PopoverContent className="flex flex-col border-[#00000020] p-2">
              <Link className="p-2 flex gap-3" to="/profile">
                <UserProfileIcon /> Profile
              </Link>
              <div className="w-full border-b-2 border-[#00000011]" />
              <button className="p-2 flex gap-3" onClick={handleLogout}>
                <LogoutIcon /> Log out
              </button>
            </PopoverContent>
          </Popover>
        ) : (
          <a
            href="/auth/sign-in"
            className="p-3 flex items-center gap-3 justify-start"
          >
            <LoginIcon />
            {visibleText && <span>Sign in</span>}
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default SideBar;
