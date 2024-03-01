import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import PrivateRoutes from "./components/PrivateRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route element={<PrivateRoutes />}>
            <Route element={<Dashboard />} path="/dashboard" exact />
            <Route element={<SendMoney />} path="/send" />
          </Route>
        </Routes>
        {/* {!isAuthorized && window.location.pathname !== "/signin" && (
          <Navigate to="/signup" />
        )} */}
      </BrowserRouter>
    </>
  );
}

export default App;
