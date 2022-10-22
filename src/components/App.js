import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import GlobalStyle from "./GlobalStyle";
import Cadastro from "./Cadastro";
import Hoje from "./Hoje";
import { useState } from "react";
import { UserContext } from "./UserContext";

export default function App() {
  const [userInfo, setUserInfo] = useState({});

  return (
    <UserContext.Provider value={[userInfo, setUserInfo]}>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/hoje" element={<Hoje />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
