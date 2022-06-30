import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Character from "./pages/Character";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/comics/:characterid" element={<Character />}></Route>
        <Route></Route>
      </Routes>
    </Router>
  );
}

export default App;
