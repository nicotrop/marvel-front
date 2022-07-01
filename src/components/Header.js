import logo from "../image/marvel-logo.png";

const Header = () => {
  return (
    <header className="m-auto flex items-center">
      <img src={logo} alt="logo" width={150} />
    </header>
  );
};

export default Header;
