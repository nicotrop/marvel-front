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
import { useState, useEffect } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMagnifyingGlass,
  faBars,
  faX,
  faHouse,
  faPowerOff,
  faHeart,
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import Loading from "./components/Loading";
library.add(
  faMagnifyingGlass,
  faBars,
  faX,
  faHouse,
  faPowerOff,
  faHeart,
  faChevronRight,
  faChevronLeft
);

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (Cookies.get("token")) {
        try {
          const { data } = await axios.get(
            `https://nico-marvel-backend.herokuapp.com/favorite/list`,
            {
              headers: { authorization: `Bearer ${Cookies.get("token")}` },
            }
          );
          setFavorites(data);
        } catch (error) {
          console.log(error);
        }
      }

      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };
    fetchData();
  }, []);

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

    //Set path and extension
    let path = "";
    let extension = "";

    if (char.thumbnail) {
      path = char.thumbnail.path;
      extension = char.thumbnail.extension;
    } else {
      path = char.path;
      extension = char.extension;
    }

    // Find element id in favorites
    let id = "";
    if (favorites?.find((elem) => elem.elementID === char._id)) {
      const resp = favorites?.find((elem) => elem.elementID === char._id);
      id = resp._id;
    }

    //Create request body
    const body = {
      title: char.title || char.name,
      path: path,
      dbID: id || "",
      type,
      extension: extension,
      description: char.description,
      elementID: char._id,
    };

    try {
      const { data } = await axios.post(
        "https://nico-marvel-backend.herokuapp.com/favorite/add",
        body,
        {
          headers: { authorization: `Bearer ${Cookies.get("token")}` },
        }
      );
      console.log("data", data);
      if (data[1].message === "added") {
        console.log([...favorites, data[0]]);
        setFavorites([...favorites, data[0]]);
      } else if (data[1].message === "deleted") {
        console.log(favorites.filter((elem) => elem._id !== data[0]._id));
        setFavorites(favorites.filter((elem) => elem._id !== data[0]._id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <Router>
      <Routes>
        <Route path="/" element={<Home favorites={favorites} />}></Route>
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
            <Favorites favorites={favorites} setFavorites={setFavorites} />
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
