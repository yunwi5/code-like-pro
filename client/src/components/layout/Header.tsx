import { NavLink } from "react-router-dom";
import ActiveNavLink from "../ui/links/ActiveNavLink";

const Header = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap px-6 py-3 m-0 shadow-sm">
      <div className="logo flex items-center flex-shrink-0 text-main-400 pl-28">
        <a className="text-xl tracking-tight hover:cursor-pointer">
          CodeLikePro
        </a>
      </div>
      <div className="main-font w-full flex flex-grow md:flex md:items-center md:w-auto">
        <div className="text-md text-center	md:flex-grow">
          <ActiveNavLink
            to="/browse"
            className="block mt-4 lg:inline-block lg:mt-0 text-text-main hover:text-main-700 mr-10"
            activeClassName="text-main-500"
          >
            Browse
          </ActiveNavLink>
          <ActiveNavLink
            to="/"
            activeClassName="text-main-500 font-semibold"
            className="block mt-4 lg:inline-block lg:mt-0 text-text-main hover:text-main-700 mr-10"
          >
            Ranking
          </ActiveNavLink>
          <ActiveNavLink
            to="/create-exercise"
            activeClassName="text-main-500 font-semibold"
            className="block mt-4 lg:inline-block lg:mt-0 text-text-main hover:text-main-700"
          >
            Create
          </ActiveNavLink>
        </div>
        <div className="pr-28">
          <NavLink
            to="/login"
            className="text-sm bg-transparent hover:bg-main-500 text-main-700 font-regular hover:text-white py-1 px-4 mr-3 border border-main-500 hover:border-transparent rounded"
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className="text-sm bg-transparent hover:bg-main-500 text-main-700 font-regular hover:text-white py-1 px-4 border border-main-500 hover:border-transparent rounded"
          >
            Register
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Header;
