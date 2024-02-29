import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import Logo from "./Logo";

const AppBar = () => {
  const navigate = useNavigate();
  return (
    <div className="shadow h-14 flex justify-between max-w-screen-2xl mx-auto my-0">
      <div className="flex flex-col justify-center h-full ml-4">
        <Logo />
      </div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">Hello</div>
        <div
          className="h-10 w-min rounded bg-slate-200 flex justify-center my-auto mr-2 cursor-pointer px-4 hover:bg-slate-300"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/signin");
          }}
        >
          <div className="flex flex-col justify-center h-full text-l font-semibold">
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppBar;
