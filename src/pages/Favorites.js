import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Loading from "../components/Loading";
import Header from "../components/Header";
import Navigation from "../components/Navigation";

const Favorites = () => {
  const [data, setData] = useState([]);
  const [currFav, setCurrFav] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/favorite/list`,
          {
            headers: { authorization: `Bearer ${Cookies.get("token")}` },
          }
        );
        console.log(data);
        setData(data);
        setCurrFav(data[0]);
      } catch (error) {
        console.log(error);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };
    fetchData();
  }, []);
  return isLoading ? (
    <Loading />
  ) : (
    <section className="h-screen w-screen sm:max-w-[700px] p-6 m-auto overflow-hidden flex flex-col justify-between gap-3 md:w-[75%] lg:w-[60%] relative">
      <header className="h-[10%] border-solid border-black border-2">
        <Navigation />
      </header>
      <main className="h-[65%] border-solid border-2 border-black flex justify-between">
        <div className="w-[20%] border-solid border-2 border-black flex flex-col pt-2 pr-1 pl-1 pb-2 gap-3">
          <span className="text-xs font-extrabold">{`Favorites (${data.length})`}</span>
          <div className="grid grid-cols-3 gap-1 overflow-y-scroll">
            {data.map((fav, index) => {
              return (
                <div onClick={() => setCurrFav(data[index])}>
                  <img
                    className="object-cover w-full h-full"
                    src={`${fav.path}.${fav.extension}`}
                    alt="favorites"
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-[55%] border-solid border-2 border-black flex flex-col items-between pr-7 pl-7 pt-2 pb-2 gap-5 box-border">
          {/* <h1 className="text-xl font-bold border-2 border-solid border-black">
            {currFav.title}
          </h1> */}
          <div className="border-black border-2 border-solid flex items-center justify-between">
            <span>{`<`}</span>
            <img
              className="w-[60%] object-cover h-full"
              src={`${currFav.path}.${currFav.extension}`}
              alt="favorite"
            />
            <span>{`>`}</span>
          </div>
          <span className="text-xs">Remove from favorites</span>
        </div>
        <div className="w-[25%] border-solid border-2 border-black flex flex-col pt-2 pl-1 pr-1 pb-2 gap-5 box-border text-xs">
          <h2 className="text-lg font-semibold border-2 border-solid border-black">
            {currFav.title}
          </h2>
          <span>type: {currFav.type || "character"}</span>
          <p className="overflow-y-scroll">{`${
            currFav.description ? currFav.description : "(No description)"
          }`}</p>
        </div>
      </main>
      <footer className="flex justify-start items-center h-[15%] mt-2 p-2 box-border border-solid border-black border-2">
        <Header />
      </footer>
    </section>
  );
};

export default Favorites;
