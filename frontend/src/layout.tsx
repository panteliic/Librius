import { Outlet } from "react-router-dom";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";

export default function Layout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar />
      <div className="w-full h-full ">
        <NavBar />
        <main className="h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
