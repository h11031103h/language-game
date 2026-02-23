import { Routes, Route } from "react-router-dom";
import { GameSelect } from "./pages/GameSelect";
import { GameDetail } from "./pages/GameDetail";
import "./App.css";

export function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<GameSelect />} />
        <Route path="/game/:gameId" element={<GameDetail />} />
      </Routes>
    </div>
  );
}
