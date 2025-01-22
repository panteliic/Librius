import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

export default function App() {
  return (
    <header>
      <nav className=" container flex p-1 mx-auto">
        <SignedOut>
          <button className="text-background bg-primary px-5 py-2 rounded-lg">
            <SignInButton />
          </button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </nav>
    </header>
  );
}
