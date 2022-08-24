import React from "react";
import styles from "../styles/index.scss";

const Header = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap px-6 py-1 m-0">
      <div className="logo flex items-center flex-shrink-0 text-main-500 pl-28">
        <a className="text-xl tracking-tight hover:cursor-pointer">
          CodeLikePro
        </a>
      </div>
      <div className="main-font w-full flex flex-grow md:flex md:items-center md:w-auto">
        <div className="text-md text-center	md:flex-grow">
          <a
            href="/browse"
            className="block mt-4 lg:inline-block lg:mt-0 text-text-main hover:text-main-700 mr-10"
          >
            Browse
          </a>
          <a
            href="/"
            className="block mt-4 lg:inline-block lg:mt-0 text-text-main hover:text-main-700 mr-10"
          >
            Ranking
          </a>
          <a
            href="/create-exercise"
            className="block mt-4 lg:inline-block lg:mt-0 text-text-main hover:text-main-700"
          >
            Create
          </a>
        </div>
        <div className="pr-28">
          <a
            href="/login"
            className="text-sm bg-transparent hover:bg-main-500 text-main-700 font-regular hover:text-white py-1 px-4 mr-3 border border-main-500 hover:border-transparent rounded"
          >
            Login
          </a>
          <a
            href="/register"
            className="text-sm bg-transparent hover:bg-main-500 text-main-700 font-regular hover:text-white py-1 px-4 border border-main-500 hover:border-transparent rounded"
          >
            Register
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
