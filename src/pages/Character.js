import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Loading from "../components/Loading";
import ComicDisplay from "../components/ComicDisplay";
import marvel_logo from "../image/marvel-logo.png";

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
      }, 500);
    };
    fetchData();
  }, [characterid]);

  return isLoading ? (
    <Loading />
  ) : (
    <section className="min-h-screen sm:h-screen w-screen overflow-y-scroll sm:max-w-[675px] p-10 m-auto sm:overflow-hidden flex flex-col sm:justify-between gap-3 md:w-[75%] lg:w-[60%] relative">
      <div className="h-[50px] sm:h-fit relative">
        <Navigation />
        <Link to="/" className="flex justify-center sm:hidden">
          <img
            className="absolute top-0 m-auto h-[100%]"
            src={marvel_logo}
            alt="logo"
          />
        </Link>
      </div>
      <div className="min-h-[150px] sm:h-[12%] flex flex-row border-solid border-2 border-black p-2 box-border">
        <img
          className="w-[30%] min-w-[140px] max-h-[150px] sm:h-[100%] object-cover mr-3"
          src={`${data?.thumbnail?.path}.${data?.thumbnail?.extension}`}
          alt="character"
        />
        <div className="h-[100%] overflow-y-scroll sm:min-h-[80px] flex flex-col gap-1">
          <h2 className="font-bold text-lg sm:text-base sm:text-start">
            {data?.name}
          </h2>
          <button className="text-[10px] w-fit border-solid border-black border-2 p-[2.5px] cursor-pointer bg-red-600 text-white shadow-[1px_2px_1px_0_black] font-bold active:translate-y-0.5 active:shadow-[0px_1px_0px_0_black] hover:bg-white hover:text-black">
            remove from list
          </button>
          <p className="text-xs text-ellipsis sm:text-start mb-2 mt-1 sm:mb-0">
            {data?.description || "(no description)"}
          </p>
        </div>
      </div>
      <div
        className={`overflow-y-hidden min-h-[55%] sm:flex gap-2 border-solid border-2 border-black`}
      >
        <div className="hidden sm:flex sm:justify-center sm:w-[70%] ">
          <ComicDisplay data={data} comic={comic} setComic={setComic} />
        </div>
        <div className="sm:w-[30%] p-2 flex flex-col sm:gap-2 gap-4 ">
          <div className="sm:hidden">
            <ComicDisplay data={data} comic={comic} setComic={setComic} />
          </div>
          <div className="flex flex-col gap-2 p-2">
            <div className="border-[0.5px] border-solid border-black sm:hidden"></div>
            <span className="text-xs sm:p-0">
              (Appears in <strong>{data?.comics.length}</strong> comics)
            </span>
            <div className="grid grid-cols-8 sm:grid-cols-4 gap-1 min-h-[40%] overflow-y-scroll sm:p-0">
              {data?.comics.map((comic) => {
                return (
                  <div key={comic._id} className="bg-slate-700">
                    <img
                      onClick={(e) => {
                        console.log(
                          String(e.target.src).includes(comic.thumbnail.path)
                        );
                        setComic(comic);
                      }}
                      className={`object-cover w-full h-full hover:cursor-pointer opacity-40 hover:opacity-100`}
                      src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                      alt="comic"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <footer className="hidden sm:flex justify-start items-center h-[15%] p-2 box-border">
        <Header />
      </footer>
    </section>
  );
};

export default Character;
