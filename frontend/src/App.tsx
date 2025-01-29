import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
export default function App() {
  return (
    <div className="flex ">
      <SideBar />
      <div className="w-full">
        <NavBar/>
        <main>
          gas
        </main>
      </div>
    </div>
  );
}
