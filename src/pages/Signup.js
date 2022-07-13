import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";

const Signup = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errormsg, setErrormsg] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrormsg("");
    const body = {
      email,
      password,
      username,
    };
    try {
      const { data } = await axios.post(
        "https://nico-marvel-backend.herokuapp.com/user/Signup",
        body
      );
      if (data) {
        setUser(data.token);
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      setErrormsg(error.message);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center relative">
      <section className="w-[70%] min-w-[250px]  md:h-fit flex flex-col justify-between items-center md:flex-row p-5 gap-3">
        <LoginForm
          handleEmailChange={handleEmailChange}
          handlePasswordChange={handlePasswordChange}
          handleSubmit={handleSubmit}
          handleUsernameChange={handleUsernameChange}
          errormsg={errormsg}
        />
        <Header />
      </section>
    </div>
  );
};

export default Signup;
