import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import marvel_logo from "../image/marvel-logo.png";
import axios from "axios";
import Cookies from "js-cookie";

const Favorites = ({ setFavorites, favorites }) => {
  const [data, setData] = useState([]);
  const [currFav, setCurrFav] = useState([]);

  const handleDelete = async (char) => {
    const body = {
      title: char.title,
      description: char.description,
      elementID: char.elementID,
      path: char.path,
      extension: char.extension,
      type: char.type,
      dbID: char._id,
    };
    try {
      const { data } = await axios.post(
        "https://nico-marvel-backend.herokuapp.com/favorite/add",
        body,
        { headers: { authorization: `Bearer ${Cookies.get("token")}` } }
      );
      console.log(data);
      const arr = [...favorites];
      arr.splice(
        favorites.findIndex((item) => item._id === currFav._id),
        1
      );

      setFavorites(arr);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    setData(favorites);
    setCurrFav(favorites[0]);
  }, [favorites]);

  return (
    <section className="h-screen w-screen sm:max-w-[800px] p-6 m-auto sm:overflow-hidden overflow-scroll flex flex-col gap-3 md:w-[75%] lg:w-[60%] relative">
      <header className="h-[100px] max-h-[10%] sm:h-fit relative">
        <Navigation />
        <Link to="/" className="flex justify-center sm:hidden">
          <img
            className="absolute top-0 m-auto h-[100%] z-10"
            src={marvel_logo}
            alt="logo"
          />
        </Link>
      </header>
      <main className="h-fit min-h-[90%] sm:min-h-0 flex flex-col">
        <div className="h-[15%] flex flex-col justify-between p-2 gap-1 sm:mb-0 mb-5">
          <span className="text-xs font-semibold">
            {"Favorites ("}
            <FontAwesomeIcon
              className="text-[8px] text-red-600 mr-[3px]"
              icon="heart"
            />
            {`${data.length})`}
          </span>
          <div className="flex overflow-x-scroll h-max">
            {data.map((fav, index) => {
              return (
                <div
                  className="shrink-0 h-full mr-1"
                  onClick={() => setCurrFav(data[index])}
                  key={fav._id}
                >
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
        <div className="h-fit sm:h-[85%] sm:flex sm:w-full">
          <div className="h-[100%] sm:min-w-[60%] flex flex-col items-between p-2 box-border sm:gap-0 gap-2">
            <div className="sm:hidden flex flex-col items-center gap-2">
              <h2 className="text-lg font-semibold sm:font-normal">
                {currFav.title}
              </h2>
              <span className="font-semibold hidden sm:block capitalize">
                {currFav.type || "character"}
              </span>
              <button
                className="text-[10px] w-fit mb-2 p-[2.5px] cursor-pointer bg-red-600 text-white shadow-[1px_2px_1px_0_black] font-bold active:translate-y-0.5 active:shadow-[0px_1px_0px_0_black] hover:bg-red-500 hover:text-black"
                onClick={() => {
                  handleDelete(currFav);
                }}
              >
                remove from list
              </button>
            </div>
            <div className="flex max-h-[350px] sm:h-[100%] sm:max-h-full items-center justify-between cursor-pointer">
              <img
                className="object-contain sm:object-cover w-full h-full"
                src={`${currFav.path}.${currFav.extension}`}
                alt="favorite"
                onClick={() => console.log(currFav)}
              />
            </div>
            <p className="sm:hidden text-sm mt-3 mb-5">{`${
              currFav.description ? currFav.description : "(No description)"
            }`}</p>
          </div>
          <div className="hidden w-[25%] sm:min-w-[40%] sm:flex flex-col p-2 gap-5 box-border text-xs">
            <div>
              <h2 className="text-lg font-semibold sm:font-normal">
                {currFav.title}
              </h2>
              <span className="font-semibold hidden sm:block capitalize">
                {currFav.type || "character"}
              </span>
              <button
                className="mt-2 text-[10px] w-fit  p-[2.5px] cursor-pointer bg-red-600 text-white shadow-[1px_2px_1px_0_black] font-bold active:translate-y-0.5 active:shadow-[0px_1px_0px_0_black] hover:bg-white hover:text-black"
                onClick={() => {
                  handleDelete(currFav);
                }}
              >
                remove from list
              </button>
            </div>
            <p className="overflow-y-scroll">{`${
              currFav.description ? currFav.description : "(No description)"
            }`}</p>
            <span
              className="cursor-pointer hover:text-white hover:bg-red-600 w-fit"
              onClick={() => {
                if (
                  data.findIndex((item) => item._id === currFav._id) <
                  data.length - 1
                ) {
                  setCurrFav(
                    data[data.findIndex((item) => item._id === currFav._id) + 1]
                  );
                } else {
                  setCurrFav(data[0]);
                }
              }}
            >
              next on the list >>
            </span>
          </div>
        </div>
      </main>
      <footer className="hidden sm:flex justify-start items-center h-[15%] mt-2 p-2 box-border ">
        <Header />
      </footer>
    </section>
  );
};

export default Favorites;
