import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBar = ({ selected, setSelected }) => {
  return (
    <div
      className={`h-[10%] w-full mb-1 flex justify-center ${
        selected && "bg-white z-40"
      }`}
    >
      <div
        className={`p-2 rounded-md min-w-[250px] flex justify-start items-center shadow ${
          selected &&
          "items-start shadow absolute w-auto h-[200px] p-4 bg-white z-40"
        }`}
      >
        <FontAwesomeIcon icon="magnifying-glass" size="sm" color="grey" />
        <input
          type="search"
          className={`outline-none h-full w-full ml-2 text-sm`}
          placeholder="Look up your favorite Marvel..."
          onFocus={() => setSelected(true)}
          onBlur={() => setSelected(false)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
