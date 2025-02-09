import { Routes, Route } from "react-router-dom";
import Layout from "./layout";
import Home from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Favorites from "./pages/FavortiesBook";
import Settings from "./pages/Settings";
import Chat from "./pages/Chat";
import Book from "./pages/Book";
import Library from "./pages/Library";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rute bez SideBar-a i NavBar-a */}
      <Route path="/auth/sign-in" element={<Login />} />
      <Route path="/auth/sign-up" element={<Register />} />
      <Route path="*" element={<NotFound />} />

      {/* Rute sa Layout-om */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/library" element={<Library />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/books/:book" element={<Book />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
