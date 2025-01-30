import { Routes, Route } from "react-router-dom";
import Home from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Library from "./pages/library";
import Favorites from "./pages/FavortiesBook";
import Settings from "./pages/Settings";
import Chat from "./pages/Chat";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/sign-in" element={<Login />} />
      <Route path="/auth/sign-up" element={<Register />} />
      <Route path="/library" element={<Library />} />
      <Route path="/library" element={<Library />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/library" element={<Settings />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
