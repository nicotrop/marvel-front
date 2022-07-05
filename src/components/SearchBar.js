import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const SearchBar = ({ selected, setSelected, setName, data, name }) => {
  const [hover, setHover] = useState([]);
  const { pathname } = useLocation();

  return (
    <div
      className={`h-[10%] w-full mb-4 flex justify-center ${
        selected && "bg-white z-40"
      }`}
    >
      <div
        className={`p-2 rounded-md w-[250px] shadow text-ellipsis box-border flex ${
          selected
            ? "absolute h-[200px] bg-white z-40 flex-col top-2"
            : "content-center"
        }`}
      >
        <div className={`flex items-center w-full ${selected && "mb-4"}`}>
          <FontAwesomeIcon icon="magnifying-glass" size="sm" color="grey" />
          <input
            type="search"
            value={name}
            className={`outline-none h-full w-full ml-2 text-sm`}
            placeholder={`${selected ? "" : "Search here..."}`}
            onFocus={() => setSelected(true)}
            onBlur={() => setSelected(false)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                setSelected(false);
              }
            }}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {selected && (
          <div className="text-sm pb-1 text-ellipsis flex flex-col justify-between h-[100%] overflow-y-scroll">
            <div className="mb-2 text-gray-500">{`(${data.count} results)`}</div>
            <div>
              {data.results.map((character) => {
                return (
                  <h3
                    key={character._id}
                    className="cursor-pointer text-sm text-gray-500 hover:text-black"
                    onMouseOver={() => {
                      setHover(character.name);
                    }}
                    onMouseLeave={() => {
                      setHover();
                    }}
                    onClick={() => {
                      console.log(hover);
                      setName(hover[0]);
                    }}
                  >
                    {
                      character[
                        `${pathname === "/characters" ? "name" : "title"}`
                      ]
                    }
                  </h3>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
