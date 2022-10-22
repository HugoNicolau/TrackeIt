import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import GlobalStyle from "./GlobalStyle";
import Cadastro from "./Cadastro";
import Hoje from "./Hoje";
import Habitos from "./Habitos"
import Historico from "./Historico";
import { useState } from "react";
import { UserContext } from "./UserContext";
import { HabitsContext } from "./HabitsContext";

export default function App() {
  const [userInfo, setUserInfo] = useState({});
  const [totalHabits, setTotalHabits] = useState(0);
  const [finishedHabits, setFinishedHabits] = useState(0);

  return (
    <UserContext.Provider value={[userInfo, setUserInfo]}>
      <HabitsContext.Provider value={[totalHabits, setTotalHabits, finishedHabits, setFinishedHabits]}>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/hoje" element={<Hoje />} />
          <Route path="/habitos" element={<Habitos />} />
          <Route path="/historico" element={<Historico />} />
        </Routes>
      </BrowserRouter>
      </HabitsContext.Provider>
    </UserContext.Provider>
  );
}
