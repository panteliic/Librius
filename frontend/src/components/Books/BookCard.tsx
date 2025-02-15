import { CameraOff, HeartIcon } from "@/main";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useState } from "react";

interface Book {
  id: number;
  title: string;
  authors: string;
  description: string;
  category: string;
  thumbnail: string | null;
  isFavorite: boolean;
  onFavoriteToggle?: (bookId: number) => void; 
}

export function BookCard(props: Book) {
  const user = useSelector((state: RootState) => state.user.user);
  const [favorite, setFavorite] = useState(props.isFavorite);
  const navigate = useNavigate();

  async function toggleFavorite() {
    if (!user) {
      navigate("/auth/sign-in");
      return;
    }

    const url = `${import.meta.env.VITE_API_URL}/${
      favorite ? "remove-favorite" : "add-favorite"
    }`;
    const method = favorite ? "DELETE" : "POST";

    try {
      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ bookId: props.id }),
      });

      setFavorite(!favorite);
      if (favorite && props.onFavoriteToggle) {
        props.onFavoriteToggle(props.id);
      }
    } catch (err) {
      console.error("Failed to update favorite status", err);
    }
  }

  return (
    <div className="bg-card text-card-foreground md:w-[calc(50%-0.5rem)] lg:w-[calc(33%-0.5rem)] xl:w-[calc(25%-0.5rem)] h-auto rounded-lg shadow-md flex flex-col justify-between">
      <div className="relative w-full h-60">
        {props.thumbnail ? (
          <img
            src={props.thumbnail}
            alt="Book cover"
            className="w-full h-60 object-contain rounded-lg py-4 "
          />
        ) : (
          <div className="h-60 w-full flex justify-center items-center bg-gray-200 rounded-lg">
            <CameraOff width={50} />
          </div>
        )}
        <div
          className="absolute top-2 right-2 cursor-pointer"
          onClick={toggleFavorite}
        >
          <HeartIcon
            width={30}
            className={favorite ? "fill-red-600" : "fill-none stroke-red-600"}
          />
        </div>
      </div>
      <div className="bg-background p-4 rounded-lg ">
        <h1 className="mt-3 text-lg font-semibold line-clamp-1">
          {props.title}
        </h1>
        <span className="text-sm text-muted-foreground">{props.authors}</span>
        <p className="text-sm mt-2 text-card-foreground line-clamp-3">
          {props.description}
        </p>
        <span className="text-xs font-semibold text-primary">
          {props.category}
        </span>
        <br />
        <Link to={`/books/${props.title.split(" ").join("-")}?id=${props.id}`}>
          <Button className="mt-3 w-full">Read more</Button>
        </Link>
      </div>
    </div>
  );
}
