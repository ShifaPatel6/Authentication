import "./App.css";
import Emailverify from "./Pages/EmailVerify";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { Routes, Route } from "react-router-dom";
import ForgotPass from "./Pages/ForgotPass";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Register />} />
        <Route path="/Emailverify" element={<Emailverify />} />
        <Route path="/ForgotPass" element={<ForgotPass />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
