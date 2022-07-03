import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Header from "../components/Header";
import CharactersGrid from "../components/CharactersGrid";
import Pagination from "../components/Pagination";
import Navigation from "../components/Navigation";

const CharacterList = () => {
  const [data, setData] = useState([]);
  const [limit] = useState(16);
  const [page, setPage] = useState(3);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://nico-marvel-backend.herokuapp.com/character?page=${page}&limit=${limit}`
        );
        setData(data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [limit, page]);

  return isLoading ? (
    <p>En cours de chargement...</p>
  ) : (
    <section className="h-screen w-screen max-w-[675px] p-6 m-auto overflow-hidden flex flex-col md:w-[75%] lg:w-[60%]">
      <Header />
      <div className="h-[2rem] w-full mt-5 mb-1 flex justify-center">
        <div className="border-black border-2 p-1 border-r border-solid rounded-md min-w-[200px] flex justify-center items-center">
          <FontAwesomeIcon icon="magnifying-glass" size="sm" />
          <input type="search" className="outline-none h-full ml-2" />
        </div>
      </div>
      <CharactersGrid data={data.results} />
      <footer className="flex flex-col justify-between h-[13%] mt-2 p-2 box-border">
        <Pagination data={data} setPage={setPage} limit={limit} page={page} />
        <Navigation />
      </footer>
    </section>
  );
};

export default CharacterList;
