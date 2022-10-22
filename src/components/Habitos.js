import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";

export default function Habitos() {
  const [userInfo] = useContext(UserContext);
  const [habitsList, setHabitsList] = useState([]);

  useEffect(() => {
    const URL =
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const promise = axios.get(URL, config);
    promise.then((res) => {
      setHabitsList(res.data);
    });
    promise.catch((err) => {
      console.log(err.response.data);
    });
  }, []);

  return (
    <HabitosContainer>
      <Header userInfo={userInfo} />
      <HabitosInnerContainer>
        <HabitsHeadPart>
          <h1>Meus hábitos</h1>
          <button>+</button>
        </HabitsHeadPart>
      </HabitosInnerContainer>
      <Footer />
    </HabitosContainer>
  );
}

const HabitosContainer = styled.div`
  background-color: #F2F2F2;
  width: 100vw;
  height: 100vh;
`;

const HabitosInnerContainer = styled.div`
  padding-top: 90px;
  padding-bottom: 120px;
  padding-left: 17px;
  padding-right: 17px;
  background-color: #F2F2F2;
  width: 100%;
  height: 100%;
`;
const HabitsHeadPart = styled.div`
  font-family: Lexend Deca;
  font-size: 23px;
  font-weight: 400;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: left;
  color: #126ba5;
  display: flex;
  justify-content: space-between;
  text-align:center;
  button {
    height: 35px;
    width: 40px;
    left: 317px;
    top: 92px;
    border-radius: 4.636363506317139px;
    font-family: Lexend Deca;
    font-size: 27px;
    font-weight: 400;
    line-height: 35px;
    letter-spacing: 0em;
    text-align: center;
    background-color: #52b6ff;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    text-align: center;
    padding: auto;
  }
`;

const OneHabitContainer = styled.div``;
