import React from "react";
import Logo from "../components/Logo";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import { Button } from "../components/Button";
import BottomWarning from "../components/BottomWarning";

const Signup = () => {
  return (
    <div className="bg-slate-300 h-100 flex justify-center py-4">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Logo />
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your information to create an account."} />
          <InputBox label={"First Name"} placeholder={"Abhishek"} />
          <InputBox label={"Last Name"} placeholder={"Kumar"} />
          <InputBox label={"Email"} placeholder={"abc@xyz.com"} />
          <InputBox label={"Password"} placeholder={"123456"} />
          <div className="pt-6">
            <Button label={"Sign up"} />
          </div>

          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign In"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
