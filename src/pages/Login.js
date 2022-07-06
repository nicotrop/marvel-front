import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errormsg, setErrormsg] = useState("");

  const navigate = useNavigate();

  console.log("token", Cookies.get("token"));

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleSubmit = async (event) => {
    console.log("handleSubmit");
    event.preventDefault();
    setErrormsg("");
    const body = {
      email,
      password,
    };
    try {
      const response = await axios.post(
        "https://nico-marvel-backend.herokuapp.com/user/login",
        body
      );
      console.log(response.data);
      if (response.data.success) {
        setUser(response.data.success);
        navigate("/");
      }
    } catch (error) {
      setErrormsg(error.response.data.message);
      console.log(error.response.data);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center relative">
      <section className="w-[70%] min-w-[250px]  md:h-[60%] flex flex-col justify-between items-center md:flex-row p-5 gap-3">
        <Header />
        <LoginForm
          handleEmailChange={handleEmailChange}
          handlePasswordChange={handlePasswordChange}
          handleSubmit={handleSubmit}
          errormsg={errormsg}
        />
      </section>
    </div>
  );
};

export default Login;
