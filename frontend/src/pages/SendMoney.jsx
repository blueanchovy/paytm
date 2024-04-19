import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../components/Button";

const SendMoney = () => {
  const [debitAmount, setDebitAmount] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const navigate = useNavigate();

  // const getCookie = (name) => {
  //   const cookieString = document.cookie;
  //   const cookies = cookieString.split("; ");
  //   for (let i = 0; i < cookies.length; i++) {
  //     const cookie = cookies[i];
  //     const [cookieName, cookieValue] = cookie.split("=");
  //     if (cookieName === name) {
  //       return cookieValue;
  //     }
  //   }
  //   return null;
  // };

  useEffect(() => {
    setTimeout(() => {
      setError(""), setSuccess("");
    }, 3000);
  }, [error, success]);
  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col space-y-1 5 p-6">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
          </div>

          <div className="px-6 !my-2">
            <div className="flex items-center space-x-4 pb-4">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-2xl text-white">
                  {name[0].toUpperCase()}
                </span>
              </div>
              <h3 className="text-2xl font-semibold">{name}</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="amount"
                  className="text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Amount (in Rs.)
                </label>
                <input
                  type="number"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  id="amount"
                  placeholder="Enter Amount"
                  value={debitAmount}
                  onChange={(e) => setDebitAmount(e.target.value)}
                />
              </div>
              <button
                onClick={async () => {
                  // const token = getCookie("jwtToken");
                  const token = localStorage.getItem("token");
                  try {
                    const response = await axios.post(
                      `${
                        import.meta.env.VITE_PAYTMAPI_URL
                      }/api/v1/account/transfer`,
                      {
                        to: id,
                        amount: debitAmount,
                      },
                      {
                        headers: {
                          authorization: "Bearer" + " " + token,
                        },
                      }
                    );
                    setError("");
                    setSuccess(response.data.msg);
                    setDebitAmount("");
                  } catch (err) {
                    setSuccess("");
                    setError(err.response.data.msg);
                    setDebitAmount("");
                  }
                }}
                className="justify-center rounded-md-text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-blue-500 text-white"
              >
                Initiate Transfer
              </button>
              {error && (
                <h3 className="text-2xl text-red-500 font-semibold">{error}</h3>
              )}
              {success && (
                <h3 className="text-2xl text-green-500 font-semibold">
                  {success}
                </h3>
              )}
            </div>
          </div>
          <div className="font-semibold text-xl text-center !my-2">Or</div>
          <div className="!my-0 mx-auto mt-0">
            <div
              className="flex flex-col rounded-full justify-center items-center py-4 px-6 w-24 h-24 mt-0 cursor-pointer hover:bg-blue-100 mx-auto my-0 border border-blue-200 bg-blue-50"
              onClick={() => navigate("/dashboard")}
            >
              <img
                src="/arrow-left-solid.svg"
                alt="back"
                width="56px"
                height="56px"
              />
            </div>
            <div className="text-lg mx-auto my-2 text-center font-semibold">
              Return to Dashboard
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
