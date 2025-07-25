import "./App.css";
import Emailverify from "./Pages/EmailVerify";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Register />} />
        <Route path="/Emailverify" element={<Emailverify />} />
      </Routes>
    </>
  );
}

export default App;
