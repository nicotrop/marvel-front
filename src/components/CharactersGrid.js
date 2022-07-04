import { Link } from "react-router-dom";
import { useState } from "react";

const CharactersGrid = ({ data, selected }) => {
  const [hover, setHover] = useState(false);
  const [currentChar, setcurrentChar] = useState([]);

  return (
    <div
      className={`${
        data.length < 16
          ? "md:grid md:gap-1 md:grid-cols-4 md:grid-rows-4 mt-3"
          : "md:grid md:gap-1 md:grid-cols-4 mt-3 md:auto-rows-fr"
      } flex flex-wrap h-[calc(90%-0.75rem)] box-border overflow-y-hidden mb-2 ${
        selected && "opacity-10 z-0"
      }`}
    >
      {data.map((character) => {
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
              <Link to={`/comics/${character._id}`}>
                {hover && currentChar._id === character._id ? (
                  <div className={`cursor-pointer w-full h-full`}>
                    <h1>{character.name}</h1>
                  </div>
                ) : (
                  <img
                    className="w-full h-full object-cover"
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    alt={`${character.name}`}
                  />
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
