import "./App.css";
import Home from "./pages/Home";
import Character from "./pages/Character";
import CharacterList from "./pages/CharacterList";
import Comics from "./pages/Comics";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMagnifyingGlass,
  faBars,
  faX,
  faHouse,
  faPowerOff,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass, faBars, faX, faHouse, faPowerOff, faHeart);

function App() {
  const [setToken] = useState(Cookies.get("token") || null);

  const setUser = (userToken) => {
    if (userToken) {
      Cookies.set("token", userToken);
    } else {
      Cookies.remove("token");
    }
    setToken(userToken);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/characters" element={<CharacterList />}></Route>
        <Route path="/comics" element={<Comics />}></Route>
        <Route path="/comics/:characterid" element={<Character />}></Route>
        <Route path="/favorites" element={<Favorites />}></Route>
        <Route path="/signin" element={<Login setUser={setUser} />}></Route>
        <Route path="/signup" element={<Signup setUser={setUser} />}></Route>
        <Route></Route>
      </Routes>
    </Router>
  );
}

export default App;
