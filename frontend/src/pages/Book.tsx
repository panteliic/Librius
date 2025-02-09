import { useParams, useSearchParams } from "react-router-dom";

const Book = () => {
  const { book } = useParams();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  return (
    <div>
      <h1>Prikaz knjige: {book?.split("-").join(" ")}</h1>
      {id && <p>ID knjige: {id}</p>}
    </div>
  );
};

export default Book;
