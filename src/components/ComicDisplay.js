const ComicDisplay = ({ data, comic, setComic }) => {
  return (
    <div className="w-[100%] flex flex-col p-2 pl-4 pr-4 gap-3">
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
        >{`<`}</span>
        <img
          className="object-cover w-[50%] h-full"
          src={`${comic?.thumbnail?.path}.${comic?.thumbnail?.extension}`}
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
        >{`>`}</span>
      </div>
      <div className="overflow-y-scroll flex flex-col gap-1">
        <h1 className=" font-bold ">{comic?.title}</h1>
        <p className="text-xs whitespace-normal	">
          {comic?.description || "(no description)"}
        </p>
      </div>
    </div>
  );
};

export default ComicDisplay;
