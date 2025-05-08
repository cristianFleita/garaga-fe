import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.scss";

import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Lobby } from "./pages/Lobby";

export const AppRoutes = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/lobby" element={<Lobby />} />
      {/* <Route path="/game" element={<Game />} /> */}
    </Routes>
  );
};
