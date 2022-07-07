import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Header from "../components/Header";
import CharactersGrid from "../components/CharactersGrid";
import Pagination from "../components/Pagination";
import Navigation from "../components/Navigation";
import Loading from "../components/Loading";
import SearchBar from "../components/SearchBar";

const CharacterList = ({ setFavorites, favorites, addFavorite }) => {
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
          `https://nico-marvel-backend.herokuapp.com/character?page=${page}&limit=${limit}&name=${name}`
        );
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [limit, page, name, selected]);

  useEffect(() => {
    const fetchData = async () => {
      if (Cookies.get("token")) {
        try {
          const { data } = await axios.get(
            // `https://nico-marvel-backend.herokuapp.com/comics/${characterid}`
            `http://localhost:4000/favorite/list`,
            {
              headers: { authorization: `Bearer ${Cookies.get("token")}` },
            }
          );
          setFavorites(data);
        } catch (error) {
          console.log(error);
        }
      }

      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };
    fetchData();
  }, [setFavorites]);

  return isLoading ? (
    <Loading />
  ) : (
    <section className="h-screen w-screen max-w-[675px] p-6 m-auto overflow-hidden flex flex-col md:w-[75%] lg:w-[60%]">
      <Header />
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
        <Navigation />
      </footer>
    </section>
  );
};

export default CharacterList;
