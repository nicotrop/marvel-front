import { Link } from "react-router-dom";
import Header from "../components/Header";

const Home = () => {
  return (
    <section className="h-screen w-screen max-w-[1200px] p-5 m-auto overflow-hidden flex flex-col items-center justify-center lg:w-[75%]">
      <div className="flex flex-col justify-center items-center h-[55%] w-full">
        <Header />
        <div className="flex flex-col gap-2">
          <Link to="/characters">
            <span className=" hover:bg-red-600 hover:text-white">
              characters
            </span>
          </Link>
          <Link to="/comics">
            <span className=" hover:bg-red-600 hover:text-white">comics</span>
          </Link>
          <Link to="/favorites">
            <span className=" hover:bg-red-600 hover:text-white">
              favorites
            </span>
          </Link>
          <Link to="/signup">
            <span className=" hover:bg-red-600 hover:text-white">signup</span>
          </Link>
          <Link to="/login">
            <span className=" hover:bg-red-600 hover:text-white">signin</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
