import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Navigation = () => {
  const [menu, setMenu] = useState(false);
  const { pathname } = useLocation();
  return (
    <div className="flex justify-between w-full">
      {menu === false ? (
        <FontAwesomeIcon
          className="sm:hidden hover:cursor-pointer"
          icon="bars"
          size="lg"
          color="black"
          onClick={() => setMenu(true)}
        />
      ) : (
        <FontAwesomeIcon
          className="sm:hidden hover:cursor-pointer"
          icon="x"
          size="lg"
          color="black"
          onClick={() => setMenu(false)}
        />
      )}
      {menu === true && (
        <div
          className={`w-[300px] h-[400px] absolute ${
            pathname.includes("/comics/")
              ? "left-14 top-6"
              : pathname === "/characters" || "/comics"
              ? "left-14 bottom-6"
              : null
          }  shadow-md bg-white sm:hidden flex flex-col justify-between items-center p-4`}
        >
          <Link to="/characters">
            <span className=" hover:bg-red-600 hover:text-white cursor-pointer">
              characters
            </span>
          </Link>
          <Link to="/comics">
            <span className=" hover:bg-red-600 hover:text-white cursor-pointer">
              comics
            </span>
          </Link>
          <Link to="/favorites">
            <span className=" hover:bg-red-600 hover:text-white cursor-pointer">
              favorites
            </span>
          </Link>
          <Link to="/signin">
            <span className=" hover:bg-red-600 hover:text-white cursor-pointer">
              sign in
            </span>
          </Link>
          <Link to="/signup">
            <span className=" hover:bg-red-600 hover:text-white cursor-pointer">
              sign up
            </span>
          </Link>
          <Link to="/">
            <span className=" hover:bg-red-600 hover:text-white cursor-pointer">
              home
            </span>
          </Link>
        </div>
      )}

      <section className="w-[80%] sm:flex justify-between hidden">
        <Link to="/characters">
          <span className=" hover:bg-red-600 hover:text-white cursor-pointer">
            characters
          </span>
        </Link>
        <Link to="/comics">
          <span className=" hover:bg-red-600 hover:text-white cursor-pointer">
            comics
          </span>
        </Link>
        <Link to="/favorites">
          <span className=" hover:bg-red-600 hover:text-white cursor-pointer">
            favorites
          </span>
        </Link>
        <Link to="/signin">
          <span className=" hover:bg-red-600 hover:text-white cursor-pointer">
            sign in
          </span>
        </Link>
        <Link to="/signup">
          <span className=" hover:bg-red-600 hover:text-white cursor-pointer">
            sign up
          </span>
        </Link>
      </section>
      <section className="sm:block hidden">
        <Link
          to="/"
          className="flex items-baseline gap-1 hover:bg-red-600 hover:text-white cursor-pointer"
        >
          <FontAwesomeIcon
            className="hidden sm:block hover:cursor-pointer hover:text-white"
            icon="house"
            size="sm"
            // color="black"
          />
          <span className=" hover:bg-red-600 hover:text-white cursor-pointer">
            home
          </span>
        </Link>
      </section>
    </div>
  );
};

export default Navigation;
