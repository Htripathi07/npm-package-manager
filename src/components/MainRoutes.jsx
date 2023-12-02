import React from "react";
import { Route, Routes } from "react-router-dom";

import Favourite from "./Favourite";
import Homepage from "./HomePage";

function Mainroutes() {
  return (
    <div className="Mainroutes">
      <Routes>
        <Route path={"/"} element={<Homepage />} />
        <Route path={"/Fav"} element={<Favourite />} />
      </Routes>
    </div>
  );
}

export default Mainroutes;
