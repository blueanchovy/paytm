import { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import axios from "axios";

const Dashboard = () => {
  const [balance, setBalance] = useState(null);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const getCurrentBalance = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_PAYTMAPI_URL}/api/v1/account/balance`,
          {
            headers: {
              authorization: "Bearer" + " " + localStorage.getItem("token"),
            },
          }
        );

        setBalance(response.data.balance);
      } catch (err) {
        console.log(err);
      }
    };
    getCurrentBalance();
  }, []);

  return (
    <div>
      <AppBar currentUser={currentUser} />
      <div className="p-6 max-w-screen-xl mx-auto my-0">
        <Balance value={balance} />
        <Users currentUser={currentUser} setCurrentUser={setCurrentUser} />
      </div>
    </div>
  );
};

export default Dashboard;
