import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import CharactersGrid from "../components/CharactersGrid";
import Pagination from "../components/Pagination";

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
        console.log(Math.floor(data.count / limit));
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
      <div className="border-2 border-solid h-[2rem] w-full mt-2"></div>
      <CharactersGrid data={data.results} />
      <footer className="flex flex-col justify-between h-[13%] mt-2 p-2 box-border">
        <Pagination data={data} setPage={setPage} limit={limit} page={page} />
        <div className="flex justify-between w-full">
          <section className="w-[70%] flex justify-between">
            <Link to="/">
              <span className=" hover:bg-red-600 hover:text-white cursor-pointer">
                home
              </span>
            </Link>
            <Link to="/comics">
              <span className=" hover:bg-red-600 hover:text-white cursor-pointer">
                comics
              </span>
            </Link>
            <Link to="/favorites">
              <span className=" hover:bg-red-600 hover:text-white cursor-pointer">
                favorites
              </span>
            </Link>
            <Link to="/signin">
              <span className=" hover:bg-red-600 hover:text-white cursor-pointer">
                sign in
              </span>
            </Link>
            <Link to="/signup">
              <span className=" hover:bg-red-600 hover:text-white cursor-pointer">
                sign up
              </span>
            </Link>
          </section>
          <section>
            <span className=" hover:bg-red-600 hover:text-white cursor-pointer">
              change view
            </span>
          </section>
        </div>
      </footer>
    </section>
  );
};

export default CharacterList;
