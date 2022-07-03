import { Link } from "react-router-dom";
import { useState } from "react";

const CharactersGrid = ({ data }) => {
  const [hover, setHover] = useState(false);
  const [currentChar, setcurrentChar] = useState([]);

  return (
    <div className="flex flex-wrap md:grid md:gap-1 md:grid-cols-4 mt-3 md:auto-rows-fr overflow-y-scroll h-[75%]">
      {data.map((character) => {
        return (
          <div
            key={character._id}
            className="p-1 md:p-0 h-[calc(100%/3)] sm:h-[calc(100%/3)] w-[calc(100%/3)] sm:w-[calc(100%/4)] md:w-full md:h-full"
            onMouseOver={() => {
              setHover(true);
              setcurrentChar(character);
            }}
            onMouseLeave={() => {
              setHover(false);
              setcurrentChar([]);
            }}
          >
            <Link to={`/comics/${character._id}`}>
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
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default CharactersGrid;
