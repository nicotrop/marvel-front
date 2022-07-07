import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";
// import Cookies from "js-cookie";
// import Loading from "../components/Loading";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import marvel_logo from "../image/marvel-logo.png";

const Favorites = ({ addFavorite, favorites }) => {
  const [data, setData] = useState(favorites);
  const [currFav, setCurrFav] = useState(favorites[0]);
  // const [isLoading, setIsLoading] = useState(true);

  // setCurrFav(favorites[0]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const { data } = await axios.get(
  //         `http://localhost:4000/favorite/list`,
  //         {
  //           headers: { authorization: `Bearer ${Cookies.get("token")}` },
  //         }
  //       );
  //       setData(data);
  //       setCurrFav(data[0]);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     setTimeout(() => {
  //       setIsLoading(false);
  //     }, 500);
  //   };
  //   fetchData();
  // }, []);
  return (
    <section className="h-screen w-screen sm:max-w-[700px] p-6 m-auto overflow-hidden flex flex-col sm:justify-between gap-3 md:w-[75%] lg:w-[60%] relative">
      <header className="h-[50px] max-h-[10%] sm:h-fit relative">
        <Navigation />
        <Link to="/" className="flex justify-center sm:hidden">
          <img
            className="absolute top-0 m-auto h-[100%]"
            src={marvel_logo}
            alt="logo"
          />
        </Link>
      </header>
      <main className="sm:h-[65%] min-h-[90%] sm:min-h-0 border-solid border-2 border-black flex justify-between">
        <div className="w-[25%] sm:w-[20%] border-solid border-2 border-black flex flex-col p-2 gap-2">
          <span className="text-xs font-extrabold hidden sm:block">{`Favorites (${data.length})`}</span>
          <div className="grid grid-cols-1 sm:grid-rows-none sm:grid-cols-3 gap-2 overflow-y-scroll">
            {data.map((fav, index) => {
              return (
                <div onClick={() => setCurrFav(data[index])} key={fav._id}>
                  <img
                    className="object-cover w-full h-full cursor-pointer"
                    src={`${fav.path}.${fav.extension}`}
                    alt="favorites"
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-[75%] sm:w-[55%] border-solid border-2 border-black flex flex-col items-between pr-7 pl-7 pt-2 pb-2 gap-5 box-border">
          <div>
            <span className="text-xs">{`Favorites (${data.length})`}</span>
            <h2 className="text-lg font-semibold">{currFav.title}</h2>
            <span className="text-xs capitalize">
              Type: {currFav.type || "Character"}
            </span>
          </div>
          <div className="flex items-center justify-between cursor-pointer">
            <span
              onClick={() => {
                if (
                  data.findIndex((item) => item._id === currFav._id) - 1 >=
                  0
                ) {
                  setCurrFav(
                    data[data.findIndex((item) => item._id === currFav._id) - 1]
                  );
                }
              }}
            >{`<`}</span>
            <img
              className="w-[60%] object-cover h-full"
              src={`${currFav.path}.${currFav.extension}`}
              alt="favorite"
            />
            <span
              onClick={() => {
                if (
                  data.findIndex((item) => item._id === currFav._id) <
                  data.length - 1
                ) {
                  setCurrFav(
                    data[data.findIndex((item) => item._id === currFav._id) + 1]
                  );
                }
              }}
            >{`>`}</span>
          </div>
          <button
            className="text-[10px] w-fit border-solid border-black border-2 p-[2.5px] cursor-pointer bg-red-600 text-white shadow-[1px_2px_1px_0_black] font-bold active:translate-y-0.5 active:shadow-[0px_1px_0px_0_black] hover:bg-white hover:text-black"
            onClick={() => {
              // console.log(currFav);
              // console.log(favorites);
              addFavorite(currFav);
            }}
          >
            remove from list
          </button>
          <p className="sm:hidden text-sm">{`${
            currFav.description ? currFav.description : "(No description)"
          }`}</p>
        </div>
        <div className="hidden w-[25%] border-solid border-2 border-black sm:flex flex-col pt-2 pl-1 pr-1 pb-2 gap-5 box-border text-xs">
          <h2 className="text-lg font-semibold border-2 border-solid border-black">
            {currFav.title}
          </h2>
          <span>type: {currFav.type || "character"}</span>
          <p className="overflow-y-scroll">{`${
            currFav.description ? currFav.description : "(No description)"
          }`}</p>
        </div>
      </main>
      <footer className="hidden sm:flex justify-start items-center h-[15%] mt-2 p-2 box-border border-solid border-black border-2">
        <Header />
      </footer>
    </section>
  );
};

export default Favorites;
