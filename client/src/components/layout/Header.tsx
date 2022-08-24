import React from "react";
import styles from "../styles/index.scss";

const Header = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap px-6 py-1 m-0">
      <div className="logo flex items-center flex-shrink-0 text-main-500 pl-10">
        <span className="text-xl tracking-tight">CodeLikePro</span>
      </div>
      <div className="main-font w-full flex flex-grow md:flex md:items-center md:w-auto">
        <div className="text-sm text-center	md:flex-grow">
          <a
            href="#responsive-header"
            className="block mt-4 lg:inline-block lg:mt-0 text-text-main hover:text-white mr-10"
          >
            Explore
          </a>
          <a
            href="#responsive-header"
            className="block mt-4 lg:inline-block lg:mt-0 text-text-main hover:text-white mr-10"
          >
            Problems
          </a>
          <a
            href="#responsive-header"
            className="block mt-4 lg:inline-block lg:mt-0 text-text-main hover:text-white mr-10"
          >
            Ranking
          </a>
          <a
            href="#responsive-header"
            className="block mt-4 lg:inline-block lg:mt-0 text-text-main hover:text-white"
          >
            Create
          </a>
        </div>
        <div className="pr-10">
          <a
            href="#"
            className="text-sm bg-transparent hover:bg-main-500 text-main-700 font-regular hover:text-white py-1 px-4 mr-3 border border-main-500 hover:border-transparent rounded"
          >
            Login
          </a>
          <a
            href="#"
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
