import logo from "../image/marvel-logo.png";
import getDate from "../tools/getDate";

const Header = () => {
  return (
    <header className="m-auto flex flex-col items-center gap-2">
      <img src={logo} alt="logo" width={150} />
      <span>{getDate()}</span>
    </header>
  );
};

export default Header;
