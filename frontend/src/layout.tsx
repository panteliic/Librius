import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useRefreshMutation } from "./store/apiSlice";
import { useDispatch } from "react-redux";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";

export default function Layout() {
  const dispatch = useDispatch();
  const [refresh] = useRefreshMutation();

  useEffect(() => {
    refresh()
      .unwrap()
      .catch(() => console.log("User not authenticated"));
  }, [dispatch, refresh]);

  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar />
      <div className="w-full h-full">
        <NavBar />
        <main className="h-full relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
