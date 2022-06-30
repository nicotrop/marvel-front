import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Character from "./pages/Character";
import CharacterList from "./pages/CharacterList";
import Comics from "./pages/Comics";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/characters" element={<CharacterList />}></Route>
        <Route path="/comics" element={<Comics />}></Route>
        <Route path="/comics/:characterid" element={<Character />}></Route>
        <Route path="/favorites" element={<Favorites />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route></Route>
      </Routes>
    </Router>
  );
}

export default App;
