import { Button } from "@/components/ui/button";
import NotFoundIlustration from "../assets/not-found.svg";

function NotFound() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center relative">
      <div className="absolute top-1/3 xl:top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 text-center z-10 items-center">
        <h3 className="cm:text-2xl md:text-3xl xl:text-4xl font-bold text-primary">
          Ooooops
        </h3>
        <h1 className="text-4xl sm:text-5xl md:text-7xl xl:text-9xl font-bold text-primary">
          PAGE NOT FOUND
        </h1>
        <Button>
          <a href="/">Back to Home</a>
        </Button>
      </div>
      <img
        src={NotFoundIlustration}
        alt="404 Illustration"
        className="absolute bottom-0 w-full  object-cover"
      />
    </div>
  );
}

export default NotFound;
