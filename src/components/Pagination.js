const Pagination = ({ data, limit, page, setPage }) => {
  const paginationArr = () => {
    let arr = [];
    const backArr = [];
    const forwardArr = [];
    if (page + 1 < 5) {
      arr = [1, 2, 3, 4, 5, "...", Math.floor(data.count / limit)];
    } else if (page + 1 > Math.floor(data.count / limit) - 4) {
      arr = [
        1,
        "...",
        Math.floor(data.count / limit) - 4,
        Math.floor(data.count / limit) - 3,
        Math.floor(data.count / limit) - 2,
        Math.floor(data.count / limit) - 1,
        Math.floor(data.count / limit),
      ];
    } else {
      for (let i = page; i > 0; i--) {
        if (backArr.length < 2) {
          backArr.push(i);
          console.log(i);
        }
      }
      for (let i = page + 1; i < Math.floor(data.count / limit); i++) {
        if (forwardArr.length < 2) {
          forwardArr.push(i + 1);
        }
      }
      arr = [
        1,
        "...",
        ...backArr.sort((a, b) => a - b),
        page + 1,
        ...forwardArr,
        "...",
        Math.floor(data.count / limit),
      ];
    }
    console.log("arr", arr);

    return arr;
  };
  return (
    <div className="flex flex-row w-[100%] justify-between items-center">
      <span
        className="hover:underline hover:cursor-pointer"
        onClick={() => setPage(page - 1)}
      >
        {"< prev"}
      </span>
      {paginationArr().map((elem, index) => {
        return (
          <span
            key={index}
            className={`${
              page + 1 === elem && "pr-1 pl-1 font-bold bg-red-600 text-white"
            } ${
              elem !== "..." && page + 1 !== elem
                ? "hover:underline hover:cursor-pointer"
                : null
            }`}
            onClick={() => {
              if (elem !== "..." && page + 1 !== elem) {
                setPage(elem - 1);
              }
            }}
          >
            {elem}
          </span>
        );
      })}
      <span
        className="hover:underline hover:cursor-pointer"
        onClick={() => setPage(page + 1)}
      >
        {"next >"}
      </span>
    </div>
  );
};

export default Pagination;
