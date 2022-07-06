import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import marvelBg from "../image/marvel-bg.avif";

const Home = () => {
  return (
    <section className="h-screen w-screen p-5 m-auto overflow-hidden flex items-center justify-center bg-zinc-900	relative font-courier">
      <img
        className="object-cover h-full w-full opacity-5 absolute z-0"
        src={marvelBg}
        alt="marvel hero poster"
      />
      <div className="flex flex-col justify-center items-center h-[55%] w-full lg:w-[75%] max-w-[1200px] z-40">
        <Header />
        <div className="flex flex-col gap-2 mt-5">
          <Link to="/characters">
            <span className=" hover:bg-red-600 text-white">characters</span>
          </Link>
          <Link to="/comics">
            <span className=" hover:bg-red-600 text-white">comics</span>
          </Link>
          <Link to="/favorites">
            <span className=" hover:bg-red-600 text-white">favorites</span>
          </Link>
          {!Cookies.get("token") && (
            <>
              <Link to="/signup">
                <span className=" hover:bg-red-600 text-white">signup</span>
              </Link>
              <Link to="/signin">
                <span className=" hover:bg-red-600 text-white">signin</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
