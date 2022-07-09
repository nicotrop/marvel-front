import { Link } from "react-router-dom";
import logo from "../image/marvel-logo.png";
import getDate from "../tools/getDate";
import { useLocation } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();
  console.log(pathname);

  return (
    <header className="flex flex-col items-center gap-2">
      <Link to="/">
        <img src={logo} alt="logo" width={150} />
      </Link>
      <span
        className={`${pathname === "/" && "text-white"} text-xs text-center`}
      >
        {getDate()}
      </span>
    </header>
  );
};

export default Header;
