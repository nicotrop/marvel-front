import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Cookies from "js-cookie";

const Navigation = () => {
  const [menu, setMenu] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="flex justify-between w-full">
      {pathname === "/favorites" ||
      pathname.includes("/comics/") ||
      pathname === "/characters" ? (
        <div>
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
              className={`w-[250px] h-[400px] absolute left-12 shadow-md bg-white sm:hidden flex flex-col justify-between items-center p-4 z-50`}
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
              {Cookies.get("token") ? (
                <div
                  className="hover:bg-red-600 hover:text-white cursor-pointer flex items-baseline"
                  onClick={() => {
                    console.log("logout");
                    Cookies.remove("token");
                    window.location.reload();
                  }}
                >
                  <FontAwesomeIcon
                    className="sm:block hover:cursor-pointer hover:text-white mr-2"
                    icon="power-off"
                    size="xs"
                  />
                  <span>sign out</span>
                </div>
              ) : (
                <>
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
                </>
              )}
              <Link to="/">
                <span className=" hover:bg-red-600 hover:text-white cursor-pointer">
                  home
                </span>
              </Link>
            </div>
          )}
        </div>
      ) : null}
      <div
        className={`justify-between w-full ${
          pathname === "/favorite" || pathname.includes("/comics/")
            ? "hidden sm:flex"
            : "flex"
        }`}
      >
        <section
          className={`w-[100%] sm:w-[80%]  justify-between ${
            pathname === "/favorites" ||
            pathname.includes("/comics/") ||
            pathname === "/characters"
              ? "hidden sm:flex"
              : "hidden sm:flex sm:text-base"
          }`}
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
          <Link to={`${Cookies.get("token") ? "/favorites" : "/signin"}`}>
            <span className=" hover:bg-red-600 hover:text-white cursor-pointer">
              favorites
            </span>
          </Link>
          {Cookies.get("token") ? (
            <div
              className="hover:bg-red-600 hover:text-white cursor-pointer flex items-baseline"
              onClick={() => {
                Cookies.remove("token");
                window.location.reload();
              }}
            >
              <FontAwesomeIcon
                className="sm:block hover:cursor-pointer hover:text-white mr-2"
                icon="power-off"
                size="xs"
              />
              <span>sign out</span>
            </div>
          ) : (
            <>
              <Link to="/signin">
                <span className=" hover:bg-red-600 hover:text-white cursor-pointer">
                  sign in
                </span>
              </Link>
            </>
          )}
        </section>
        <section
          className={`w-[20%] justify-end ${
            pathname === "/favorites" ||
            pathname.includes("/comics/") ||
            pathname === "/characters"
              ? "hidden sm:flex"
              : "hidden sm:flex sm:text-base"
          }`}
        >
          <Link
            to="/"
            className="flex items-baseline gap-1 hover:bg-red-600 hover:text-white cursor-pointer"
          >
            <FontAwesomeIcon
              className={`hover:cursor-pointer hover:text-white ${
                pathname === "/favorites" ? "hidden sm:block" : "block"
              }`}
              icon="house"
              size="sm"
            />
            <span className=" hover:bg-red-600 hover:text-white cursor-pointer">
              home
            </span>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Navigation;
