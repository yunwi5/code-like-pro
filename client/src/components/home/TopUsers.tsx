import React from "react";
import { Link } from "react-router-dom";

const TopUsers: React.FC = () => {
  return (
    <div className="h-[80vh] w-full">
      <div className="grid lg:grid-cols-3 md:grid-cols-1 h-full p-16">
        <div className="col-span-2"></div>
        <div className="col-span-1 flex-center flex-col content-center pr-16">
          <div className="text-right flex flex-col justify-end">
            <div className="">
              <h1 className="text-text-main-500 text-4xl my-2 p-0">
                Top Users
              </h1>

              <h2 className="w-2/4 my-4 leading-7 ml-auto">
                Take a look at our community of talented developers
              </h2>
              <Link className="text-blue-500" to="/ranking">
                Rankings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopUsers;
