import { useState } from "react";
import Logo from "../components/Logo";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import { Button } from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContainer from "../components/AuthContainer";

const initialFormData = {
  firstname: "",
  lastname: "",
  username: "",
  password: "",
};

const Signup = () => {
  const [formData, setFormData] = useState({ ...initialFormData });
  const navigate = useNavigate();
  return (
    <AuthContainer>
      <Logo />
      <Heading label={"Sign up"} />
      <SubHeading label={"Enter your information to create an account."} />
      <InputBox
        onChange={(e) =>
          setFormData({ ...formData, firstname: e.target.value })
        }
        label={"First Name"}
        placeholder={"Abhishek"}
      />
      <InputBox
        onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
        label={"Last Name"}
        placeholder={"Kumar"}
      />
      <InputBox
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        label={"Email"}
        placeholder={"abc@xyz.com"}
      />
      <InputBox
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        label={"Password"}
        placeholder={"123456"}
      />
      <div className="pt-6">
        <Button
          label={"Sign up"}
          onClick={async () => {
            try {
              // const response = await axios.post(
              //   "http://localhost:3000/api/v1/user/signup",
              //   {
              //     ...formData,
              //   }
              // );
              // const token = response.data.token;
              // const endOfDay = new Date();
              // endOfDay.setHours(23, 59, 59, 999);
              // document.cookie = `jwtToken=${token}; expires=${endOfDay.toUTCString()}; SameSite=Strict`;
              const response = await axios.post(
                "http://localhost:3000/api/v1/user/signup",
                {
                  ...formData,
                }
              );
              localStorage.setItem("token", response.data.token);
              navigate("/dashboard");
            } catch (err) {
              console.error("Error signing up:", err);
            }
          }}
        />
      </div>

      <BottomWarning
        label={"Already have an account?"}
        buttonText={"Sign In"}
        to={"/signin"}
      />
    </AuthContainer>
  );
};

export default Signup;
