import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";

function Homepage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="flex min-h-svh max-w-full flex-col items-center justify-center gap-16 bg-neutral-100 px-3 text-center">
      <Logo textSize="text-4xl sm:text-5xl" isLink={false} />
      <div className="flex flex-col gap-6">
        <p className="text-md font-bold italic sm:text-xl">
          Forgetting to track your chores? Struggling to keep your indulgences
          in check?
        </p>
        <p className="text-md italic sm:text-lg">
          Keep your chores organized, stay accountable, and reward yourself for
          staying on top of things!
        </p>
      </div>
      <div className="flex gap-10">
        {!isLoggedIn && (
          <>
            <Link
              className="cursor-pointer rounded-sm px-3 py-2 text-xl hover:bg-neutral-200"
              to="/app"
              onClick={() => {
                setIsLoggedIn(true);
              }}
            >
              Log In
            </Link>
            <button className="cursor-pointer rounded-sm px-3 py-2 text-xl hover:bg-neutral-200">
              Sign Up
            </button>
          </>
        )}
        {isLoggedIn && (
          <Link
            to="/app"
            className="cursor-pointer rounded-sm px-3 py-2 text-xl hover:bg-neutral-200"
          >
            Continue
          </Link>
        )}
      </div>
    </div>
  );
}

export default Homepage;
