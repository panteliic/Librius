import { Outlet } from "react-router-dom";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";

export default function Layout() {
  return (
    <div className="flex">
      <SideBar />
      <div className="w-full">
        <NavBar />
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
