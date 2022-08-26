import React from "react";
import CustomInput from "../ui/inputs/CustomInput";
import Button from "../ui/buttons/Button";
import {
  FacebookIcon,
  InstagramIcon,
  GithubIcon,
  TwitterIcon,
  GoogleIcon,
} from "../../assets/svg-icons/svg-components";

const btnClass = "min-w-[10rem] my-3 w-full";

const AuthCard = (props: { isLogin: boolean }) => {
  return (
    <div className="flex justify-center">
      <div className="absolute z-0 bg-main-400 h-[65%] md:w-1/4 translate-x-2 translate-y-2"></div>
      <div className="absolute z-1 flex justify-center p-6 h-[65%] bg-grey-300 md:w-1/4 ">
        <div className="text-center w-full">
          <h1 className="logo text-2xl font-light">CodeLikePro</h1>
          {props.isLogin ? (
            <div>
              <h2 className="text-lg mt-3">Login</h2>
              <p className="text-xs font-light">Sign in to your account</p>
            </div>
          ) : (
            <div>
              <h2 className="text-lg mt-3">Register</h2>
              <p className="text-xs font-light">Create an account</p>
            </div>
          )}
          <div className="flex flex-col w-full">
            <CustomInput type="text" placeholder="Username" />
            <CustomInput type="password" placeholder="Password" />
            {props.isLogin ? (
              <Button className={btnClass}>Login</Button>
            ) : (
              <div>
                <CustomInput type="text" placeholder="Name" />
                <Button className={btnClass}>Register</Button>
              </div>
            )}

            {props.isLogin ? (
              <p className="text-xs font-light mr-auto m-0">
                Don't have an Account? Sign up here
              </p>
            ) : (
              <p className="text-xs font-light mr-auto m-0">
                Already have an Account? Log in here
              </p>
            )}

            <Button className="btn-social mt-10">
              <div className="flex align-center justify-between">
                <div className="w-[25px]"></div>
                Sign in with Google
                <GoogleIcon height="25" width="25" />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthCard;
