import Logo from "../components/Logo";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import { Button } from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import AuthContainer from "../components/AuthContainer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const initialFormData = {
  username: "",
  password: "",
};

const Signin = () => {
  const [formData, setFormData] = useState({ ...initialFormData });
  const navigate = useNavigate();
  return (
    <AuthContainer>
      <Logo />
      <Heading label={"Sign in"} />
      <SubHeading label={"Enter your credentials to access your account"} />
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
          label={"Sign in"}
          onClick={async () => {
            try {
              const response = await axios.post(
                `$${import.meta.env.VITE_PAYTMAPI_URL}/api/v1/user/signin`,
                {
                  ...formData,
                }
              );
              // const token = response.data.token;
              // const endOfDay = new Date();
              // endOfDay.setHours(23, 59, 59, 999);
              // document.cookie = `jwtToken=${token}; expires=${endOfDay.toUTCString()}; SameSite=Strict`;
              await localStorage.setItem("token", response?.data?.token);
              navigate("/dashboard");
            } catch (err) {
              console.error("Error signing up:", err);
            }
          }}
        />
      </div>

      <BottomWarning
        label={"Don't have an account?"}
        buttonText={"Sign up"}
        to={"/signup"}
      />
    </AuthContainer>
  );
};

export default Signin;
