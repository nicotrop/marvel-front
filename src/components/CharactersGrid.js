import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const CharactersGrid = ({ data, selected }) => {
  const { pathname } = useLocation();
  const [hover, setHover] = useState(false);
  const [currentChar, setcurrentChar] = useState([]);

  return (
    <div
      className={`md:grid md:gap-1 md:grid-cols-4 md:grid-rows-4 mt-3 flex flex-wrap h-[calc(90%-1rem)] box-border overflow-y-scroll md:overflow-y-hidden mb-2 ${
        selected && "opacity-20 z-0"
      }`}
    >
      {data.results.map((character) => {
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
            {selected ? (
              <>
                {hover && currentChar._id === character._id ? (
                  <div className="cursor-pointer w-full h-full">
                    <h1>{character._id}</h1>
                  </div>
                ) : (
                  <img
                    className="w-full h-full object-cover"
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    alt={`${character.name}`}
                  />
                )}
              </>
            ) : (
              <Link
                to={`${
                  pathname === "/characters"
                    ? "/comics/" + character._id
                    : "/comics"
                }`}
              >
                {hover && currentChar._id === character._id ? (
                  <img
                    className="w-full h-full object-cover"
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    alt={`${character.name}`}
                  />
                ) : (
                  <div
                    className={`cursor-pointer w-full h-full p-2 bg-slate-700 relative flex justify-center items-center text-bold text-white`}
                  >
                    <h1 className="w-[80%] max-h-[80%] m-auto text-sm text-center text-ellipsis break-normal font-extrabold border-solid border-2 border-white p-[2.5px] uppercase overflow-clip">
                      {
                        character[
                          `${pathname === "/characters" ? "name" : "title"}`
                        ]
                      }
                    </h1>
                    <img
                      className="w-full h-full object-cover absolute opacity-10"
                      src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                      alt={`${character.name}`}
                    />
                  </div>
                )}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CharactersGrid;
