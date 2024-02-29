import { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import axios from "axios";

const Dashboard = () => {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const getCurrentBalance = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/account/balance",
          {
            headers: {
              authorization: "Bearer" + " " + localStorage.getItem("token"),
            },
          }
        );
        console.log(response);
        console.log(response.data);
        console.log(response.data.balance);
        console.log(response.balance);
        setBalance(response.data.balance);
      } catch (err) {
        console.log(err);
      }
    };
    getCurrentBalance();
  }, []);

  return (
    <div>
      <AppBar />
      <div className="p-6 max-w-screen-xl mx-auto my-0">
        <Balance value={balance} />
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
