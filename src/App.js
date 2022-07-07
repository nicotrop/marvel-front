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
import axios from "axios";
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
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [favorites, setFavorites] = useState([]);

  const setUser = (userToken) => {
    if (userToken) {
      Cookies.set("token", userToken);
    } else {
      Cookies.remove("token");
    }
    setToken(userToken);
  };

  const addFavorite = async (char) => {
    //Set type
    let type = "";
    if (char.title) {
      type = "comic";
    } else {
      type = "character";
    }

    //Find element id in favorites
    let id = "";
    if (favorites?.find((elem) => elem.elementID === char._id)) {
      const resp = favorites?.find((elem) => elem.elementID === char._id);
      id = resp._id;
    }

    //Create request body
    const body = {
      title: char.title || char.name,
      path: char.thumbnail.path,
      dbID: id || "",
      type,
      extension: char.thumbnail.extension,
      description: char.description,
      elementID: char._id,
    };

    try {
      const { data } = await axios.post(
        "http://localhost:4000/favorite/add",
        body,
        {
          headers: { authorization: `Bearer ${Cookies.get("token")}` },
        }
      );
      if (data[1].message === "added") {
        setFavorites([...favorites, data[0]]);
      } else if (data[1].message === "deleted") {
        setFavorites(favorites.filter((elem) => elem._id !== data[0]._id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/characters"
          element={
            <CharacterList
              favorites={favorites}
              setFavorites={setFavorites}
              addFavorite={addFavorite}
            />
          }
        ></Route>
        <Route
          path="/comics"
          element={
            <Comics
              favorites={favorites}
              setFavorites={setFavorites}
              addFavorite={addFavorite}
            />
          }
        ></Route>
        <Route
          path="/comics/:characterid"
          element={
            <Character
              favorites={favorites}
              setFavorites={setFavorites}
              addFavorite={addFavorite}
            />
          }
        ></Route>
        <Route
          path="/favorites"
          element={
            <Favorites
              favorites={favorites}
              setFavorites={setFavorites}
              addFavorite={addFavorite}
            />
          }
        ></Route>
        <Route
          path="/signin"
          element={<Login token={token} setUser={setUser} />}
        ></Route>
        <Route path="/signup" element={<Signup setUser={setUser} />}></Route>
        <Route></Route>
      </Routes>
    </Router>
  );
}

export default App;
