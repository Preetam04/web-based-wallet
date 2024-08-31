import React from "react";
import { DarkModeBtn } from "./DarkModeBtn";

const NavBar = () => {
  return (
    <nav className="w-full h-24 flex items-center justify-center">
      <div className="container flex items-center justify-between ">
        <h1 className="font-bold text-3xl ">Wallet Generator</h1>

        <DarkModeBtn />
      </div>
    </nav>
  );
};

export default NavBar;
