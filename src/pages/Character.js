import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Loading from "../components/Loading";
import ComicDisplay from "../components/ComicDisplay";

const Character = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [comic, setComic] = useState([]);
  const { characterid } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://nico-marvel-backend.herokuapp.com/comics/${characterid}`
        );
        setData(data);
        setComic(data.comics[0]);
      } catch (error) {
        console.log(error);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    };
    fetchData();
  }, [characterid]);

  return isLoading ? (
    <Loading />
  ) : (
    <section className="sm:h-screen sm:w-screen sm:max-w-[675px] p-6 m-auto overflow-hidden flex flex-col justify-between gap-3 md:w-[75%] lg:w-[60%] relative">
      <Navigation />
      <div className={`overflow-y-hidden h-[85%] mt-3 sm:flex gap-2`}>
        <div className="hidden sm:flex sm:justify-center sm:w-[70%]">
          <ComicDisplay data={data} comic={comic} setComic={setComic} />
        </div>
        <div className="sm:w-[30%] p-2 flex flex-col justify-between sm:gap-2 gap-4">
          <img
            className="min-h-[30%] sm:w-full w-[50%] m-auto rounded-sm sm:rounded-none object-cover"
            src={`${data?.thumbnail?.path}.${data?.thumbnail?.extension}`}
            alt="character"
          />
          <div className="overflow-y-scroll sm:min-h-[110px]">
            <h2 className="font-bold text-lg sm:text-base text-center sm:text-start">
              {data?.name}
            </h2>
            <p className="text-xs text-ellipsis text-center sm:text-start mb-2 sm:mb-0">
              {data?.description || "(no description)"}
            </p>
          </div>
          <div className="sm:hidden">
            <ComicDisplay data={data} comic={comic} setComic={setComic} />
          </div>
          <span className="text-xs p-2 sm:p-0">
            (Appears in <strong>{data?.comics.length}</strong> comics)
          </span>
          <div className="grid grid-cols-3 gap-1 min-h-[40%] overflow-y-scroll p-2 sm:p-0">
            {data?.comics.map((comic) => {
              return (
                <img
                  onClick={() => {
                    setComic(comic);
                  }}
                  className="object-cover w-full h-full hover:cursor-pointer"
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt="comic"
                />
              );
            })}
          </div>
        </div>
      </div>
      <footer className="flex justify-start items-center h-[15%] mt-2 p-2 box-border">
        <Header />
      </footer>
    </section>
  );
};

export default Character;
