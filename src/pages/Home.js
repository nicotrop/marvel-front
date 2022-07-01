import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import CharactersGrid from "../components/CharactersGrid";

const Home = () => {
  const [data, setData] = useState([]);
  // const [filtered, setFiltered] = useState([]);
  const [limit, setLimit] = useState(24);
  const [page, setPage] = useState(3);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://nico-marvel-backend.herokuapp.com/character?page=${page}&limit=${limit}`
        );
        console.log(Math.floor(data.count / limit));
        setData(data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [limit, page]);

  const paginationArr = () => {
    let arr = [];
    const backArr = [];
    const forwardArr = [];
    if (page + 1 < 5) {
      arr = [1, 2, 3, 4, 5, "...", Math.floor(data.count / limit)];
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

  return isLoading ? (
    <p>En cours de chargement...</p>
  ) : (
    <section className="h-screen w-screen max-w-[1200px] p-5 m-auto overflow-hidden flex flex-col lg:w-[75%] border-solid border-4 border-red-500">
      <Header />
      <CharactersGrid data={data.results} />
      <footer className="flex flex-col h-[20%] border-solid border-2 border-black mt-2">
        <div className="flex flex-row w-[100%] justify-between items-center p-2 box-border">
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
                  page + 1 === elem &&
                  "border-solid border-black border-2 pr-1 pl-1"
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
      </footer>
    </section>
  );
};

export default Home;
