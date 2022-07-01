import { Link } from "react-router-dom";

const CharactersGrid = ({ data }) => {
  return (
    <div className="grid grid-cols-4 grid-rows-[200px minmax(200px 200px)] gap-1 md:grid-cols-6 mt-5 md:auto-rows-fr overflow-y-scroll">
      {data.map((character) => {
        return (
          <div key={character._id}>
            <Link to={`/comics/${character._id}`}>
              <img
                className="w-full h-full object-cover"
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={`${character.name}`}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default CharactersGrid;
