import { Link } from "react-router-dom";

const Navigation = () => {
  return (
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
  );
};

export default Navigation;
