import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import defaultImg from "../image/defaultImg.jpeg";

const ComicDisplay = ({ data, comic, setComic }) => {
  return (
    <div className="w-[100%] flex flex-col p-2 pl-4 pr-4 gap-3">
      <h1 className="font-bold text-center">{comic?.title}</h1>
      <div className="flex justify-between items-center h-[60%]">
        <span
          className="hover:cursor-pointer"
          onClick={() => {
            if (
              data.comics.findIndex((item) => item._id === comic._id) - 1 >=
              0
            ) {
              setComic(
                data.comics[
                  data.comics.findIndex((item) => item._id === comic._id) - 1
                ]
              );
            }
          }}
        >
          <FontAwesomeIcon
            className="text-[10px] mr-[3px]"
            size="sm"
            icon="chevron-left"
          />
        </span>
        <img
          className="object-contain max-h-[255px] min-w-[100px] w-[50%] h-full object-top"
          src={`${
            comic?.thumbnail.path.endsWith("image_not_available")
              ? defaultImg
              : comic?.thumbnail.path + "." + comic?.thumbnail.extension
          }`}
          alt="comic"
        />
        <span
          className="hover:cursor-pointer"
          onClick={() => {
            if (
              data.comics.findIndex((item) => item._id === comic._id) + 1 <
              data.comics.length
            ) {
              setComic(
                data.comics[
                  data.comics.findIndex((item) => item._id === comic._id) + 1
                ]
              );
            }
          }}
        >
          <FontAwesomeIcon
            className="text-[10px] mr-[3px]"
            size="sm"
            icon="chevron-right"
          />
        </span>
      </div>
      <div className="overflow-y-auto flex flex-col gap-1">
        <p className="text-xs whitespace-normal	">
          {comic?.description || "(no description)"}
        </p>
      </div>
    </div>
  );
};

export default ComicDisplay;
