import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import axios from "axios";
import Cookies from "js-cookie";
import defaultImg from "../image/defaultImg.jpeg";

const CharactersGrid = ({ data, selected, favorites, addFavorite }) => {
  const { pathname } = useLocation();
  const [hover, setHover] = useState(false);
  const [currentChar, setcurrentChar] = useState([]);

  const navigate = useNavigate();

  return (
    <div
      className={`md:grid md:gap-1 md:grid-cols-4 md:grid-rows-4 mt-3 flex flex-wrap h-[calc(90%-1rem)] box-border overflow-y-scroll md:overflow-y-hidden mb-2 ${
        selected && "opacity-20 z-0"
      }`}
    >
      {data?.results?.map((character) => {
        return (
          <div
            key={character._id}
            className="p-1 md:p-0 h-[calc(100%/3)] sm:h-[calc(100%/3)] w-[calc(100%/2)] sm:w-[calc(100%/4)] md:w-full md:h-full"
            onMouseOver={() => {
              if (!selected) {
                setHover(true);
                setcurrentChar(character);
              }
            }}
            onMouseLeave={() => {
              if (!selected) {
                setHover(false);
                setcurrentChar([]);
              }
            }}
          >
            <div className="h-full w-full relative z-10">
              <Link
                to={`${
                  pathname === "/characters"
                    ? "/comics/" + character._id
                    : "/comics"
                }`}
              >
                {hover && currentChar._id === character._id ? (
                  <>
                    <img
                      className="w-full h-full object-cover"
                      src={`${
                        character.thumbnail.path.endsWith("image_not_available")
                          ? defaultImg
                          : character.thumbnail.path +
                            "." +
                            character.thumbnail.extension
                      }`}
                      alt={`${character.name}`}
                    />
                  </>
                ) : (
                  <div
                    className={`cursor-pointer w-full h-full p-2 bg-slate-700 flex justify-center items-center text-bold text-white relative`}
                  >
                    <h1 className="w-[80%] max-h-[80%] m-auto text-sm text-center text-ellipsis break-normal font-extrabold border-solid border-2 border-white p-[2.5px] uppercase overflow-hidden">
                      {
                        character[
                          `${pathname === "/characters" ? "name" : "title"}`
                        ]
                      }
                    </h1>
                    <img
                      className="w-full h-full object-cover absolute opacity-10"
                      src={`${
                        character.thumbnail.path.endsWith("image_not_available")
                          ? defaultImg
                          : character.thumbnail.path +
                            "." +
                            character.thumbnail.extension
                      }`}
                      alt={`${character.name}`}
                    />
                  </div>
                )}
              </Link>
              {hover && currentChar._id === character._id ? (
                <div
                  onClick={() => {
                    if (Cookies.get("token")) {
                      addFavorite(character);
                    } else {
                      navigate("/signin");
                    }
                  }}
                  className="absolute right-0 top-0 text-light-gray hover:cursor-pointer p-2 z-50 text-[12px]"
                >
                  <FontAwesomeIcon
                    className={`sm:block ${
                      favorites.find((elem) => elem.elementID === character._id)
                        ? "text-red-600 hover:text-white"
                        : "text-white hover:text-red-600"
                    }`}
                    icon="heart"
                  />
                </div>
              ) : null}
              {favorites?.findIndex(
                (fav) => fav.elementID === character._id
              ) !== -1 ? (
                <div className="absolute right-0 top-0 p-2 text-white text-[12px]">
                  <FontAwesomeIcon
                    className="sm:block  hover:text-red-600"
                    icon="heart"
                  />
                </div>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CharactersGrid;
