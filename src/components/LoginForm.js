import { useLocation } from "react-router-dom";

const LoginForm = ({
  handleSubmit,
  handleEmailChange,
  password,
  handlePasswordChange,
  email,
  errormsg,
  username,
  handleUsernameChange,
}) => {
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <div className="w-[100%] md:w-[50%] min-w-[250px] h-[100%] flex flex-col justify-between p-5 gap-5 mt-10 border-solid border-2 border-black">
      <div className="flex items-center justify-center">
        <h1 className="md:text-2xl text-2xl font-extrabold text-center">
          {`${
            pathname === "/signup"
              ? "Create a new account"
              : "Login to your account"
          }`}
        </h1>
      </div>
      <form
        className="max-h-[70%] flex flex-col justify-center items-center gap-10 p-2"
        onSubmit={handleSubmit}
      >
        {pathname === "/signup" && (
          <input
            className="w-full h-[50px] border-solid border-2 border-black p-2 focus:outline-none"
            type="text"
            name="username"
            value={username}
            placeholder="username"
            onChange={handleUsernameChange}
          />
        )}
        <input
          className="w-full h-[50px] border-solid border-2 border-black p-2 focus:outline-none"
          type="text"
          name="email"
          value={email}
          placeholder="email"
          onChange={handleEmailChange}
        />
        <input
          className="w-full h-[50px] border-solid border-2 border-black p-2 focus:outline-none"
          type="password"
          name="pwd"
          placeholder="password"
          value={password}
          onChange={handlePasswordChange}
        />
        {errormsg && <p style={{ color: "red" }}>{errormsg}</p>}
        <div className="p-2 flex justify-center">
          <button
            className="m-auto shadow-md text-white text-xl pl-4 pr-4 rounded-md bg-red-600 border-solid border-red-600 border-2"
            type="submit"
          >
            {`${pathname === "/signup" ? "Signup" : "Login"}`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
