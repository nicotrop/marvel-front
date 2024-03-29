import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import CharactersGrid from "../components/CharactersGrid";
import Pagination from "../components/Pagination";
import Navigation from "../components/Navigation";
import Loading from "../components/Loading";
import SearchBar from "../components/SearchBar";
import marvel_logo from "../image/marvel-logo.png";

const Comics = ({ favorites, setFavorites, addFavorite }) => {
  const [data, setData] = useState([]);
  const [limit] = useState(16);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://marvel-backend-zwjy.onrender.com/comics?page=${page}&limit=${limit}&title=${name}`
        );
        setData(data);
      } catch (error) {
        console.log(error);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };
    fetchData();
  }, [limit, page, name, selected]);

  return isLoading ? (
    <Loading />
  ) : (
    <section className="h-screen w-screen max-w-[675px] p-6 m-auto overflow-hidden flex flex-col md:w-[75%] lg:w-[60%]">
      <header className="hidden sm:block">
        <Header />
      </header>
      <header className="h-[100px] max-h-[10%] sm:h-fit relative sm:hidden">
        <div className="h-full flex items-center">
          <Navigation />
        </div>
        <Link to="/" className="flex justify-center sm:hidden">
          <img
            className="absolute top-0 m-auto h-[100%] z-10"
            src={marvel_logo}
            alt="logo"
          />
        </Link>
      </header>
      <div
        className={`overflow-y-hidden h-[85%] mt-3 ${selected && "relative "}`}
      >
        <SearchBar
          selected={selected}
          setSelected={setSelected}
          data={data}
          setName={setName}
          name={name}
        />
        <CharactersGrid
          data={data}
          selected={selected}
          favorites={favorites}
          addFavorite={addFavorite}
        />
      </div>
      <footer className="flex flex-col justify-between h-[15%] mt-2 p-2 box-border">
        <Pagination data={data} setPage={setPage} limit={limit} page={page} />
        <div className="hidden sm:block">
          <Navigation favorites={favorites} />
        </div>
      </footer>
    </section>
  );
};

export default Comics;
