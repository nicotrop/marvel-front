import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

const Home = () => {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(36);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://nico-marvel-backend.herokuapp.com/character?page=${page}&limit=${limit}`
        );
        console.log(data);
        setData(data);
        setIsLoading(false);
      } catch (error) {}
    };
    fetchData();
  }, [limit, page]);

  return isLoading ? (
    <p>En cours de chargement...</p>
  ) : (
    <section className="h-screen w-screen max-w-[1200px] p-5 m-auto overflow-hidden flex flex-col">
      <header className="m-auto flex items-center">
        <Header />
      </header>

      <div className="grid grid-cols-4 grid-rows-[200px minmax(200px 200px)] gap-1 md:grid-cols-6 mt-5 md:auto-rows-fr overflow-y-scroll lg:w-[75%] m-auto">
        {data.results.map((character) => {
          return (
            <div key={character._id}>
              <Link to={`/comics/${character._id}`}>
                <img
                  className="w-full h-full object-cover"
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  alt={`${character.name}`}
                />
              </Link>
            </div>
          );
        })}
      </div>
      <footer></footer>
    </section>
  );
};

export default Home;
